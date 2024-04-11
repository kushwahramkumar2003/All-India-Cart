import { Router } from 'express'
import authRoutes from './auth.routes'
import categoryRoutes from './category.routes'
import couponRoutes from './coupon.routes'
import { rateLimitMiddleware } from '../middlewares/rateLimitter'

const router = Router()

router.use('/auth', rateLimitMiddleware, authRoutes)
router.use('/category', rateLimitMiddleware, categoryRoutes)
router.use('/coupon', rateLimitMiddleware, couponRoutes)

export default router
