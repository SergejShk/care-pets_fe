import { z } from "zod";

export const profileShema = {
	name: z.string().min(3).max(40),
	email: z.string().email().min(5),
	city: z.string().min(2).max(40),
	phone: z.string().min(5).max(20),
	birthday: z.coerce.date(),
};
