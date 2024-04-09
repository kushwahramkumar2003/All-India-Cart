import { Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { CategorySchema } from '../../types/caegory'
import { prisma } from '../utils/prisma'
import { azureUpload } from '../services/azure'

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = CategorySchema.parse(req.body)

  const icon = req.file as Express.Multer.File

  let iconUrl: string | null = null

  if (!icon) {
    iconUrl = await azureUpload(icon)
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
      picture: iconUrl
    }
  })

  res.status(201).json({
    message: 'Category created',
    category
  })
})

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany()

  res.status(200).json(categories)
})

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const category = await prisma.category.findUnique({
    where: {
      id
    }
  })

  res.status(200).json(category)
})

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description } = CategorySchema.parse(req.body)

  const category = await prisma.category.update({
    where: {
      id
    },
    data: {
      name,
      description
    }
  })

  res.status(200).json({
    message: 'Category updated',
    category
  })
})

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  await prisma.category.delete({
    where: {
      id
    }
  })

  res.status(204).end()
})
