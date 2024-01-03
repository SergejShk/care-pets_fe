import { z } from "zod";

export const petSchema = {
	name: z.string().min(2).max(16),
	birthday: z.coerce.date(),
	breed: z.string().min(2).max(16),
	comments: z.string().min(8).max(120),
};
