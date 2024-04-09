import { Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { SupplierSchema } from '../../types/supplier'
import { prisma } from '../utils/prisma'
import { azureUpload } from '../services/azure'

const UpdateSupplierDetails = asyncHandler(async (req: Request, res: Response) => {
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
  } = SupplierSchema.parse(req.body)

  const avatar = req.file

  let picture

  if (avatar) {
    picture = await azureUpload(avatar)
    if (!picture) {
      throw new Error('Error uploading avatar')
    }
  }

  const supplier = await prisma.supplier.findFirst({
    where: {
      email
    }
  })

  if (!supplier) {
    throw new Error('Supplier not found')
  }

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
      discountAvailable: discountAvailable || supplier.discountAvailable,
      notes: notes || supplier.notes,
      picture: picture || supplier.picture ? supplier.picture : null
    }
  })

  res.status(200).json({
    message: 'Update Supplier Details',
    user: updatedSupplier
  })
})
