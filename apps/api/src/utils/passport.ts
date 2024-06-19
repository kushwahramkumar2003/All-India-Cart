import { prisma as db } from './prisma'
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require('passport-github2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
import passport from 'passport'
import dotenv from 'dotenv'
import { CartItem } from '@prisma/client'

interface GithubEmailRes {
  email: string
  primary: boolean
  verified: boolean
  visibility: 'private' | 'public'
}

dotenv.config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_google_client_id'
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret'
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'your_github_client_id'
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'your_github_client_secret'
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'your_facebook_app_id'
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'your_facebook_app_secret'

export function initPassport() {
  if (
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET ||
    !GITHUB_CLIENT_ID ||
    !GITHUB_CLIENT_SECRET ||
    !FACEBOOK_APP_ID ||
    !FACEBOOK_APP_SECRET
  ) {
    throw new Error('Missing environment variables for authentication providers')
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/callback'
      },
      async function (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) {
        try {
          console.log('google profile ', profile?._json?.picture)
          const email = profile.emails[0].value
          const name = profile.displayName

          // Check if the user already exists
          let user = await db.user.findUnique({
            where: {
              email: email
            }
          })

          // If user doesn't exist, create a new UserProfile and User
          if (!user) {
            const userProfile = await db.userProfile.create({
              data: {}
            })

            user = await db.user.create({
              data: {
                email: email,
                name: name,
                provider: 'GOOGLE',
                userProfileId: userProfile.id,
                avatar: profile?._json?.picture,
                cart: {
                  create: {
                    totalPrice: 0
                  }
                }
              }
            })
          } else {
            // Update the user's name if they already exist
            user = await db.user.update({
              where: {
                email: email
              },
              data: {
                name: name,
                avatar: profile?._json?.picture
              }
            })
          }

          done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/github/callback'
      },
      async function (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) {
        try {
          // console.log('github profile', profile?._json?.avatar_url)
          // Fetch the user's primary email from GitHub
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Authorization: `token ${accessToken}`
            }
          })
          const data: GithubEmailRes[] = await res.json()
          const primaryEmail = data.find((item) => item.primary === true)

          if (!primaryEmail) {
            return done(new Error('No primary email found for the GitHub user'))
          }

          // Check if the user already exists
          let user = await db.user.findUnique({
            where: {
              email: primaryEmail?.email
            }
          })

          // If user doesn't exist, create a new UserProfile and User
          if (!user) {
            const userProfile = await db.userProfile.create({
              data: {}
            })

            user = await db.user.create({
              data: {
                avatar: profile._json.avatar_url,
                email: primaryEmail?.email,
                name: profile.displayName,
                provider: 'GITHUB',
                userProfileId: userProfile.id
              }
            })
          } else {
            // Update the user's name if they already exist
            user = await db.user.update({
              where: {
                email: primaryEmail?.email
              },
              data: {
                avatar: profile._json.avatar_url,
                name: profile.displayName
              }
            })
          }

          done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.avatar
      })
    })
  })

  passport.deserializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, user)
    })
  })
}
