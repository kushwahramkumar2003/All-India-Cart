import z from 'zod'
export const CouponSchema = z.object({
  id: z.string().optional(),
  code: z.string(),
  discount: z.number()
})
