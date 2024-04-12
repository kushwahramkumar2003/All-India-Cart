import { Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { SupplierSchema, SupplierUpdateSchema } from '../types/supplier'
import { prisma } from '../utils/prisma'
import { azureUpload } from '../services/azure'

export const updateSupplierDetails = asyncHandler(async (req: Request, res: Response) => {
  const {
    companyName,
    contactName,
    contactTitle,
    address,
    city,
    region,
    postalCode,
    country,
    phone,
    fax,
    homePage,
    email,
    url,
    paymentMethod,
    discountType,
    typeGoods,
    discountAvailable,
    notes
  } = SupplierUpdateSchema.parse(req.body)

  const supplier = await prisma.supplier.findFirst({
    where: {
      email
    }
  })

  if (!supplier) {
    throw new Error('Supplier not found')
  }

  const discount = Number.parseInt(discountAvailable)

  //@ts-ignore
  const avatar = req.files ? (req.files[0] as Express.Multer.File) : null

  console.log('avatar ', avatar)

  let picture

  if (avatar) {
    picture = await azureUpload(avatar)

    if (!picture) {
      throw new Error('Error uploading avatar')
    }
  }
  console.log('picture ', picture)
  const updatedSupplier = await prisma.supplier.update({
    where: {
      id: supplier.id
    },
    data: {
      companyName: companyName || supplier.companyName,
      contactName: contactName || supplier.contactName,
      contactTitle: contactTitle || supplier.contactTitle,
      address: address || supplier.address,
      city: city || supplier.city,
      region: region || supplier.region,
      postalCode: postalCode || supplier.postalCode,
      country: country || supplier.country,
      phone: phone || supplier.phone,
      fax: fax || supplier.fax,
      homePage: homePage || supplier.homePage,
      url: url || supplier.url,
      paymentMethod: paymentMethod || supplier.paymentMethod,
      discountType: discountType || supplier.discountType,
      typeGoods: typeGoods || supplier.typeGoods,
      discountAvailable: discount || supplier.discountAvailable,
      notes: notes || supplier.notes,
      picture: picture || supplier.picture
    }
  })

  res.status(200).json({
    message: 'Update Supplier Details',
    user: updatedSupplier
  })
})
