import { Router } from 'express'
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon
} from '../controllers/coupon.controller'

const router = Router()

router.post('/', createCoupon)
router.get('/', getAllCoupons)
router.get('/:couponId', getCouponById)
router.put('/:couponId', updateCoupon)
router.delete('/:couponId', deleteCoupon)
export default router
