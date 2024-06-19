import { Router } from 'express'
import { addItemToCart, getCart, removeCartItem, updateCartItem } from '../controllers/cart.controller'

const router = Router()

router.post('/', addItemToCart)
router.get('/', getCart)
router.put('/', updateCartItem)
router.delete('/', removeCartItem)

export default router
