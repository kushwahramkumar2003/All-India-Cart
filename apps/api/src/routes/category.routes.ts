import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from '../controllers/category.controllers'

const router = Router()

router.post('/new', createCategory)
router.get('/', getCategories)
router.get('/:id', getCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
