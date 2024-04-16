import { Router } from 'express'
import {
  createNewProduct,
  getAllSupplierProducts,
  getProductById,
  getProductsByCategory,
  updateProductDetails,
  uploadPrductImage
} from '../controllers/product.controllers'
import { authMiddleware } from '../middlewares/authMiddlewares'

const router = Router()

// router.post('/', authMiddleware, createNewProduct)
router.post('/', createNewProduct)
router.put('/:productId', authMiddleware, updateProductDetails)
router.delete('/:productId', authMiddleware, updateProductDetails)
router.get('/supplier', authMiddleware, getAllSupplierProducts)
router.get('/:productId', getProductById)
router.get('/byCategory/:category', getProductsByCategory)
router.post('/upload/img',uploadPrductImage)

export default router
