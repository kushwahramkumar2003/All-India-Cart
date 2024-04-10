import { Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { CategorySchema } from '../../types/caegory'
import { prisma } from '../utils/prisma'
import { azureUpload, imageArrUploader } from '../services/azure'
import { ProductSchema } from '../../types/product'
import { Supplier } from '@prisma/client'

export const createNewProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    sku,
    categoryId,
    quantityPerUnit,
    unitPrice,
    unitInStock,
    msrp,
    availableSize,
    availableColors,
    size,
    color,
    discount,
    discountAvailable,
    unitWeight,
    unitsOnOrder,
    reorderLevel,
    productAvailable
  } = ProductSchema.parse(req.body)

  const files = req.files as Express.Multer.File[] // Extract uploaded files

  const productImages = await imageArrUploader(files)

  //@ts-ignore

  const supplier = req.user as Supplier

  const product = await prisma.product.create({
    data: {
      name,
      description,
      sku,
      categoryId,
      quantityPerUnit,
      unitPrice,
      unitInStock,
      msrp,
      availableSize,
      availableColors,
      size,
      color,
      discount,
      unitWeight,
      unitsOnOrder,
      reorderLevel,
      productAvailable,
      discountAvailable,
      picture: productImages,
      supplierId: supplier.id
    }
  })

  if (!product) {
    throw new Error('Error in creating new Product.')
  }

  res.status(200).json({
    message: 'Product added Succesfully.',
    product: product
  })
})

export const updateProductDetails = asyncHandler(async (req: Request, res: Response) => {
  const {
    id,
    name,
    description,
    sku,
    categoryId,
    quantityPerUnit,
    unitPrice,
    unitInStock,
    msrp,
    availableSize,
    availableColors,
    size,
    color,
    discount,
    discountAvailable,
    unitWeight,
    unitsOnOrder,
    reorderLevel,
    productAvailable
  } = ProductSchema.parse(req.body)

  //@ts-ignore
  const user = req.user as Supplier

  const product = await prisma.product.findFirst({
    where: {
      id: id
    }
  })

  if (!product) {
    throw new Error('Product not found')
  }

  const updatedProduct = prisma.product.update({
    where: {
      id: id
    },
    data: {
      name: name || product.name,
      description: description || product.description,
      sku: sku || product.sku,
      categoryId: categoryId || product.categoryId,
      quantityPerUnit: quantityPerUnit || product.quantityPerUnit,
      unitPrice: unitPrice || product.unitPrice,
      unitInStock: unitInStock || product.unitInStock,
      msrp: msrp || product.msrp,
      availableSize: availableSize || product.availableSize,
      availableColors: availableColors || product.availableColors,
      size: size || product.size,
      color: color || product.color,
      discount: discount || product.discount,
      discountAvailable: discountAvailable || product.discountAvailable,
      unitWeight: unitWeight || product.unitWeight,
      unitsOnOrder: unitsOnOrder || product.unitsOnOrder,
      reorderLevel: reorderLevel || product.reorderLevel,
      productAvailable: productAvailable || product.productAvailable
    }
  })

  if (!updatedProduct) {
    throw new Error('Error in updating product!')
  }
  res.status(200).json({
    message: 'Product updated Successfully.',
    product: updatedProduct
  })
})

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.productId

  const product = await prisma.product.findFirst({
    where: {
      id: productId
    }
  })
  if (!product) {
    throw new Error('Product not found!')
  }

  await prisma.product.delete({ where: { id: productId } })

  res.status(200).json({
    message: 'Product deleted Successfully!!'
  })
})

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user as Supplier
  const products = await prisma.product.findMany({
    where: {
      supplierId: user.id
    }
  })
  res.status(200).json({
    message: 'Products fetched Successfully!!',
    products
  })
})

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id
  if (!productId) {
    throw new Error('Please give product Id')
  }
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })
  if (!product) {
    throw new Error('Product not found!!')
  }

  res.json({
    message: 'Product fetched successfully',
    product: product
  })
})
