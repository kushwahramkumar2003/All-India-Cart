import { Router } from 'express'
import {
  loginFailed,
  logout,
  refreshToken,
  sellerLogin,
  sellerRegester,
  updatePassword
} from '../controllers/auth.controllers'
import passport from 'passport'
import config from '../config'

const router = Router()

router.post('/seller/register', sellerRegester)
router.post('/seller/login', sellerLogin)
router.get('/logout', logout)
router.put('/seller/updatePassword', updatePassword)
router.get('/refresh', refreshToken)
router.get('/login/failed', loginFailed)
router.get('/logout', logout)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: config.CLIENT_URL,
    failureRedirect: '/login/failed'
  })
)
router.get(
  '/github',
  (req, res, next) => {
    console.log('github login called')
    next()
  },
  passport.authenticate('github', { scope: ['read:user', 'user:email'] })
)
router.get(
  '/github/callback',
  (req, res, next) => {
    console.log('github login callback called')
    next()
  },
  passport.authenticate('github', {
    successRedirect: config.CLIENT_URL,
    failureRedirect: '/login/failed'
  })
)
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }))
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: config.CLIENT_URL,
    failureRedirect: '/login/failed'
  })
)
export default router
