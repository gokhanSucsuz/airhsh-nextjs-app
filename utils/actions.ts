"use server";
import db from "@/utils/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { imageSchema, profileSchema, propertySchema, reviewSchema, validateWithZodSchema } from './schemas';
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) {
		throw new Error("Please login to access this page!")
	}
	if(!user.privateMetadata.hasProfile) {
		throw new Error("Please create a profile to access this page!")
	}
	return user;
}
export const createProfileAction = async (
	prevState: any,
	formData: FormData
) => {
	try {
		const user = await currentUser();
		if (!user) throw new Error("Please login to create profile!")
		console.log(user);
		const rawData = Object.fromEntries(formData);
		const validatedFields = validateWithZodSchema(profileSchema, rawData);
		await db.profile.create({
			data: {
                clerkId: user?.id,
                ...validatedFields,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? "",
			}
        });
        const client = await clerkClient()
        
        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
               hasProfile: true
            }
        })
	} catch (error) {
		return renderError(error)
    }
    redirect('/');
};

const renderError = (error: unknown): { message: string } => {
    if (error instanceof ZodError) {
        return {
            message:error.issues[0]?.message || "An error occurred!"
        }
    }
    if (error instanceof Error) {
        return {
            message:error.message
        }
    }
    return {
        message:"An error occurred!"
    }
}

export const fetchProfileImage = async () => {
    const user = await currentUser()
    if (!user) return null
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
        select: {
            profileImage:true
        }
    })
    return profile?.profileImage
}

export const fetchProfile = async () => { 
    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        }
    })
    if(!profile) redirect('/profile/create')
    return profile
}

export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
    const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(profileSchema, rawData);
    await db.profile.update({
        where: {
            clerkId: user.id
        },
        data: validatedFields
        
    })
        revalidatePath("/profile")
    return {
        message: "Profile updated successfully!"}
    } catch (error) {
        return renderError(error)
    }
    
}

export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
   const user = await getAuthUser()
    try {
        const image = formData.get("image") as File;
        const validatedFields = validateWithZodSchema(imageSchema, {image});
        console.log(validatedFields)
        const fullPath = await uploadImage(validatedFields.image)

        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: {
                profileImage: fullPath
            }
        })
        revalidatePath("/profile")
        return { message: "Profile updated successfully!"}
    } catch (error) {
        return renderError(error)
    }
}

export const createPropertyAction = async (prevState: any, formData: FormData): Promise<{message: string}> => {
    const user = await getAuthUser();
try {
    const rawData = Object.fromEntries(formData);
    const image = formData.get("image") as File;
    const validatedImage = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedImage.image)
    const validatedFields = validateWithZodSchema(propertySchema, rawData)

    await db.property.create({
        data: {
            ...validatedFields,
            profileId: user.id,
            image: fullPath
        }
    })
    return {message: "Property created successfully!"}
} catch (error) {
    console.log(error)
    return renderError(error)
}
    
}

export const fetchProperties = async ({search="", category}:{search?:string, category?:string}) => {
    const properties = await db.property.findMany({
        where: {
            category,
            OR: [
                {name:{contains:search, mode:"insensitive"}},
                {tagline:{contains:search, mode:"insensitive"}},
            ]
       },
        select: {
            id: true,
            name: true,
            tagline: true,
            country: true,
            price: true,
            image: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return properties
}

export const fetchFavoriteId = async ({ propertyId }: { propertyId: string }) => {
    const user = await getAuthUser();
    if (!user) {
  throw new Error("User not authenticated");
}
    const favorite = await db.favorite.findFirst({
        where: {
            propertyId,
            profileId: user.id
        },
        select: {
            id:true,
        }
    });
    return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from Faves' : 'Added to Faves' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
    const user = await getAuthUser()

    const favorites = await db.favorite.findMany({
        where: {
            profileId:user.id
        },
        select: {
            property: {
                select: {
                    id: true,
                    name: true,
                    tagline: true,
                    country: true,
                    price: true,
                    image: true
                }
            }
        }
    })
    return favorites.map((favorite)=> favorite.property)
}

export const fetchPropertyDetail = async (id: string) => {
    const property = await db.property.findUnique({
        where: {
            id:id
        },
        include: {
            profile: true,
            reviews:true,
        }
    })
    return property
}

export async function formatQuantity (quantity: number, noun: string) {
    return (quantity === 1) ? `${quantity}${noun}`: `${quantity}${noun}s`
}

export const fetchPropertyProfile = async (profileId: string) => {
    const profile = await db.profile.findUnique({
        where: {
            clerkId:profileId,
        }, select: {
            clerkId:true,
            firstName: true,
            profileImage: true,
            createdAt: true
        }
    })
    return profile
}

export const createReviewAction = async ( prevState: any, formData:FormData) => {
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(reviewSchema, rawData)
    try {
            const review = await db.review.create({
        data: {
            profileId: user.id,
            ...validateFields
        }
            })
        revalidatePath(`/properties/${validateFields.propertyId}`)
        return { message: "Review created successfully!" }
        
    } catch (error) {
        return renderError(error)
    }
}

export const fetchPropertyReviews = async (propertyId: string) => {
        const reviews = await db.review.findMany({
        where: {
            propertyId
            },
            select: {
                id: true,
                rating: true,
                comment: true,
                profile: {
                    select: {
                        firstName: true,
                        profileImage: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
    })
    return reviews

    
}

export const fetchPropertyReviewsByUser = async () => {
    return { message: "Propery Reviews belongs to user fetched successfully!"}
}

export const deleteReviewAction = async () => {
    return { message: "Review deleted successfully!"}
}