import z, { string } from 'zod'

export const SupplierSchema = z.object({
  companyName: z.string(),
  contactName: z.string(),
  contactTitle: z.string(),
  address: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string(),
  fax: z.string(),
  password: z.string(),
  homePage: z.string(),
  email: z.string(),
  url: z.string(),
  paymentMethod: z.string(),
  discountType: z.string(),
  typeGoods: z.string(),
  discountAvailable: z.number().int(),
  currentOrder: z.number().int(),
  picture: z.string(),
  ranking: z.number().multipleOf(0.01),
  notes: z.string().optional(),
  active: z.boolean(),
  deleted: z.boolean()
})

export const SignUpSupplierSchema = z.object({
  companyName: z.string(),
  contactName: z.string(),
  phone: z.string(),
  password: z.string(),
  email: z.string()
})
