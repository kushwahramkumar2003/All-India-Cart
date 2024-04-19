import z from 'zod'

export const ProductSchema = z.object({
  id: z.string().optional(),
  // sku: z.string(),
  name: z.string(),
  description: z.string(),
  // supplierId: z.string(),
  categoryId: z.string(),
  quantityPerUnit: z.number(),
  unitPrice: z.number(),
  unitInStock: z.boolean(),
  msrp: z.number(),
  availableSize: z.array(z.string()),
  availableColors: z.array(z.string()),
  size: z.string(),
  color: z.string(),
  discount: z.number(),
  unitWeight: z.number(),
  // unitsOnOrder: z.number(),
  reorderLevel: z.number(),
  productAvailable: z.boolean(),
  // discountAvailable: z.number(),
  picture: z.array(z.string()).optional()
})
