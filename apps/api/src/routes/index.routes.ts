import { Router } from 'express'
import authRoutes from './auth.routes'
import categoryRoutes from './category.routes'
import couponRoutes from './coupon.routes'
import supplierRoutes from './supplier.routes'
import productRoutes from './product.routes'
import cartRoutes from './cart.routes'
import { rateLimitMiddleware } from '../middlewares/rateLimitter'
import { authMiddleware } from '../middlewares/authMiddlewares'

const router = Router()

router.use('/auth', rateLimitMiddleware, authRoutes)
router.use('/category', rateLimitMiddleware, categoryRoutes)
router.use('/coupon', rateLimitMiddleware, couponRoutes)
router.use('/supplier', rateLimitMiddleware, supplierRoutes)
router.use('/product', rateLimitMiddleware, productRoutes)
router.use('/cart', rateLimitMiddleware, authMiddleware, cartRoutes)

export default router
