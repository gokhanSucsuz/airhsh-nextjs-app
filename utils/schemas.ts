import { z } from "zod";

export const profileSchema = z.object({
	// firstName: z.string().max(5, { message: "max length is 5" }),
	firstName: z.string().min(2, { message: "First name min length is 2" }),
	lastName: z.string().min(2, { message: "Last name min length is 2" }),
	username: z.string().min(2, { message: "Username min length is 2" })
});

export function validateWithZodSchema<T>(
	schema: z.ZodSchema<T>,
	data: unknown
): T {
	const result = schema.safeParse(data);
	if (!result.success) {
		const errors = result.error.errors.map(err => err.message);
		throw new Error(errors.join(", "));
	}
	return result.data;
}

export const imageSchema = z.object({
	image: validateFile()
});

function validateFile() {
	const maxUploadSize = 1024 * 1024;
	const acceptedFilesTypes = ["image/"];
	return z
		.instanceof(File)
		.refine(file => {
			return !file || file.size <= maxUploadSize;
		}, "File size must be less than 1MB!")
		.refine(file => {
			return (
				!file || acceptedFilesTypes.some(type => file.type.startsWith(type))
			);
		}, "File must be an image!");
}
