import z from 'zod'
export const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  picture: z.string().optional(),
  active: z.boolean().default(true),
  id: z.string().optional()
})
