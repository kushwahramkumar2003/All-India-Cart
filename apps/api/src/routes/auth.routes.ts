import { Router } from 'express'
import { logout, sellerLogin, sellerRegester, updatePassword } from '../controllers/auth.controllers'

const router = Router()

router.post('/seller/regester', sellerRegester)
router.post('/seller/login', sellerLogin)
router.get('/logout', logout)
router.put('/seller/updatePassword', updatePassword)

export default router
