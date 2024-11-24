import { Booking } from './../node_modules/.prisma/client/index.d';
"use server";
import db from "@/utils/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { imageSchema, profileSchema, propertySchema, reviewSchema, validateWithZodSchema } from './schemas';
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";
import { calculateTotals } from './calculateTotals';

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

export const fetchPropertyDetail = async(id: string) => {
    return db.property.findUnique({
        where: {
            id:id
        },
        include: {
            profile: true,
            bookings: {
                select: {
                    checkIn: true,
                    checkOut: true
                }
            }
        }
    })
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
         await db.review.create({
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
    const user = await getAuthUser();
    const reviews = await db.review.findMany({
        where: {
            profileId:user.id
        },
        select: {
            id: true,
            rating: true,
            comment: true,
            property: {
                select: {
                    name: true,
                    image:true,
                }
            },
            profile: {
                select: {
                    firstName: true,
                    profileImage: true,
                    createdAt: true
                }
            }
        }
    })
    return reviews
}


export const deleteReviewAction = async (prevState: { reviewId: string })=> {
    const { reviewId } = prevState
    const user = await getAuthUser();
    try {
        await db.review.delete({
            where: {
                id: reviewId,
                profileId: user.id
            }
        })
const response = { message: "Review deleted successfully!" };
        revalidatePath(`/reviews`)
        return response
    } catch (error) {
        console.error("Delete error:", error);
        return renderError(error)
    }
}

export const fetchPropertyRating = async (propertyId: string) => {
    const result = await db.review.groupBy({
        by: ['propertyId'],
        _avg: {
            rating: true,
        },
        _count: {
            rating: true,
        },
        where: {
            propertyId,
        },
    });

    return {
        rating: result[0]?._avg?.rating?.toFixed() ?? 0,
        count: result[0]?._count?.rating ?? 0,
    };
};

export const findExistingReview = async(userId:string,propertyId: string) => {
    return db.review.findFirst({
        where: {
            profileId: userId,
            propertyId
        }
    })
}


export const createBookingAction = async (prevState: { propertyId: string, checkIn: Date, checkOut: Date }) => {
    const user = await getAuthUser();
    const { propertyId, checkIn, checkOut } = prevState;
    const property = await db.property.findUnique({
        where: {
            id: propertyId
        },
        select: {
            price: true,
            profileId:true
        }
    })
    const propertyProfileId = property?.profileId

    if (!property) return { message: "Property not found" }
    const { orderTotal, totalNights } = calculateTotals({ checkIn, checkOut, price: property.price })

    if(user.id === propertyProfileId) return { message: "You are own the property!" }
    
    try {
        const booking = await db.booking.create({
            data: {
                checkIn,
                checkOut,
                totalNights,
                orderTotal,
                propertyId,
                profileId: user.id
            }
        })
         return { message:"Create Booking"}  
    } catch (error) {
        return renderError(error)
    }
   
}

export const fetchBookings = async () => {
    const user = await getAuthUser();
    const bookings = await db.booking.findMany({
        where: {
            profileId:user.id
        },
        include: {
            property: {
                select: {
                    id: true,
                    name: true,
                    country:true,
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return bookings;
}

export const deleteBookingAction = async (prevState: { bookingId: string }) => {
    const { bookingId } = prevState;
    const user = await getAuthUser();
    try {
        await db.booking.delete({
            where: {
                id: bookingId,
                profileId: user.id
            }
        })
        revalidatePath("/bookings")
        return { message: "Booking deleted successfully!" }
    } catch (error) {
        return renderError(error)
    }
}

export const deleteRentalAction = async (prevState:{propertyId:string}) => {
    const user = await getAuthUser();
    const {propertyId} = prevState
    try {
        await db.property.delete({
        where:{
            id:propertyId,
            profileId:user.id}
    })
    revalidatePath("/rentals")
    return { message: "Rental deleted successfully!" }
    } catch (error) {
        return renderError(error)
    }
    
}


export const fetchRentals = async () => {
    const user = await getAuthUser();
    const rentals = await db.property.findMany({
        where: {
            profileId:user.id
        },
        select: {
            id: true,
            name: true,
            price: true,
        }
    })
    const rentalsWithBookingSums = await Promise.all(rentals.map(async (rental) => {
        const totalNightsSum = await db.booking.aggregate({
            where: {
                propertyId: rental.id,
            },
            _sum: {
                totalNights: true
            }
        })
        const totalOrderSum = await db.booking.aggregate({
            where: {
                propertyId: rental.id,
            },
            _sum: {
                orderTotal: true
            }
        })
        return {
            ...rental,
            totalNightSum:totalNightsSum._sum.totalNights,
            totalOrderSum:totalOrderSum._sum.orderTotal
        }
    })
    )

    return rentalsWithBookingSums;
}

export const fetchRentalDetails = async (propertyId: string) => {
    const user = await getAuthUser()
    const property = await db.property.findUnique({
        where: {
            id: propertyId,
            profileId: user.id
        }
    })
    return property
}

export const updatePropertyAction = async (prevState: any, formData: FormData): Promise<{message: string}> => {
    const propertyId = formData.get("id") as string;
    const user = await getAuthUser()
    try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(propertySchema, rawData)

    await db.property.update({
        where: {
            profileId: user.id,
            id: propertyId
        },
        data: {
            ...validatedFields
        }
    })
    revalidatePath(`/rentals/${propertyId}/edit`)
    return { message: "Property updated successfully!" }
    } catch (error) {
        return renderError(error)
    }
    
}

export const updatePropertyImageAction = async (prevState:any, formData:FormData): Promise<{message:string}> => {
    const user = await getAuthUser()
    const propertyId = formData.get("id") as string;
    const image = formData.get("image") as File;
try {
        const validatedFields = validateWithZodSchema(imageSchema, {image})
    const fullPath = await uploadImage(validatedFields.image)
    await db.property.update({
        where: {
            profileId: user.id,
            id: propertyId
        },
        data: {
            image: fullPath
        }
    })
    revalidatePath(`/rentals/${propertyId}/edit`)
    return { message: "Property image updated successfully!" }
} catch (error) {
    return renderError(error)
}
}