import { Router } from 'express'
import {
  createNewProduct,
  deleteProduct,
  getAllSupplierProducts,
  getProductById,
  getProductsByCategory,
  updateProductDetails,
  uploadPrductImage
} from '../controllers/product.controllers'
import { authMiddleware } from '../middlewares/authMiddlewares'

const router = Router()

router.post('/', authMiddleware, createNewProduct)
router.put('/:productId', authMiddleware, updateProductDetails)
router.delete('/:productId', authMiddleware, deleteProduct)
router.get('/supplier', authMiddleware, getAllSupplierProducts)
router.get('/:productId', getProductById)
router.get('/byCategory/:category', getProductsByCategory)
router.post('/upload/img', uploadPrductImage)

export default router
