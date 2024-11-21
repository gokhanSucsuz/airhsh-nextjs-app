"use server";
import db from "@/utils/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from './schemas';
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