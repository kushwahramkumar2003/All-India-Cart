import { Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { SignUpSupplierSchema, SupplierLoginSchema } from '../types/supplier'
import { prisma } from '../utils/prisma'
import bcrypt from 'bcrypt'
import getNewToken from '../utils/jwtToken'
import jwt from 'jsonwebtoken'
import config from '../config'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: true
}

/***************************************
 * @kushwahramkumar2003
 * @api {post} /api/auth/register
 * @apiName signUp
 * @apiGroup Auth
 * @apiDescription Sign up a new user
 ****************************************/
export const sellerRegester = asyncHandler(async (req: Request, res: Response) => {
  const { companyName, contactName, phone, password, email } = SignUpSupplierSchema.parse(req.body)

  if (await prisma.supplier.findFirst({ where: { email: email } })) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(15))
  const seller = await prisma.supplier.create({
    data: {
      companyName,
      contactName,
      phone,
      password: hashedPassword,
      email
    }
  })

  seller.password = ''

  const jwtToken = await getNewToken(seller)

  res.cookie('token', jwtToken, cookieOptions)

  res.status(201).json({
    message: 'User created',
    user: {
      companyName,
      name: contactName,
      phone,
      email
    }
  })
})

/**************************************
 * @kushwahramkumar2003
 * @api {post} /api/auth/login
 * @apiName login
 * @apiGroup Auth
 * @apiDescription Login a user
 ****************************************/
export const sellerLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = SupplierLoginSchema.parse(req.body)

  const user = await prisma.supplier.findUnique({ where: { email } })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid email or password')
  }

  user.password = ''

  const token = await getNewToken(user)

  res.cookie('token', token, cookieOptions)

  res.status(200).json({
    message: 'User logged in successfully',
    user: {
      email: user.email,

      name: user.contactName,
      companyName: user.companyName,
      contactTitle: user.contactTitle,
      address: user.address,
      city: user.city,
      region: user.region,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone,
      fax: user.fax,
      homePage: user.homePage,
      url: user.url,
      picture: user.picture,
      ranking: user.ranking
    }
  })
})

/**************************************
 * @kushwahramkumar2003
 * @api {get} /api/auth/logout
 * @apiName logout
 * @apiGroup Auth
 * @apiDescription Logout a user
 ****************************************/
// export const logout = asyncHandler(async (req: Request, res: Response) => {
//   res.clearCookie('token', cookieOptions)
//   res.status(200).json({ message: 'User Logged out successfully' })
// })

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req?.body.id) {
    throw new Error('User not found')
  }

  const user = await prisma.supplier.delete({
    where: {
      id: req.body.id
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  res.status(200).json({ message: 'User deleted successfully' })
})

/**************************************
 * @kushwahramkumar2003
 * @api {get} /api/auth/user
 * @apiName getUser
 * @apiGroup Auth
 * @apiDescription Get user details
 ****************************************/
export const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const { id, password } = req.body
  if (!id || !password) {
    throw new Error('Invalid request')
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(15))

  const user = await prisma.supplier.update({
    where: {
      id
    },
    data: {
      password: hashedPassword
    }
  })

  if (!user) {
    throw new Error('User not found')
  }
  user.password = ''

  res.status(200).json({ message: 'Password updated successfully' })
})

interface User {
  id: string
}

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  console.log('refresh token endpoint hit')
  if (req.user) {
    const user = req.user as User

    // Token is issued so it can be shared b/w HTTP and ws server
    // Todo: Make this temporary and add refresh logic here

    const userDb = await prisma.user.findFirst({
      where: {
        id: user.id
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        name: true,
        provider: true,
        lastLogin: true,
        profile: {
          select: {
            class: true,
            room: true,
            building: true,
            addresses: {
              select: {
                id: true,
                street: true,
                city: true,
                state: true,
                postalCode: true,
                country: true,
                type: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            voiceMail: true,
            creditCard: true,
            dateEntered: true,
            dateUpdated: true,
            active: true,
            notes: true,
            Order: {
              select: {
                id: true,
                orderNumber: true,
                orderDate: true,
                shipDate: true,
                requiredDate: true,
                freight: true,
                salesTax: true,
                timestamp: true,
                transactStatus: true,
                errLocation: true,
                errMsg: true,
                fulfilled: true,
                deleted: true,
                paid: true,
                paymentDate: true,
                orderDetails: {
                  select: {
                    id: true,
                    price: true,
                    quantity: true,
                    discount: true,
                    total: true,
                    fulfilled: true,
                    shipDate: true,
                    billDate: true,
                    product: {
                      select: {
                        id: true,
                        name: true,
                        description: true,
                        sku: true,
                        unitPrice: true,
                        msrp: true,
                        quantityPerUnit: true,
                        unitWeight: true,
                        unitInStock: true,
                        category: {
                          select: {
                            id: true,
                            name: true,
                            description: true
                          }
                        },
                        supplier: {
                          select: {
                            id: true,
                            companyName: true
                          }
                        }
                      }
                    }
                  }
                },
                payment: {
                  select: {
                    id: true,
                    type: true,
                    allowed: true
                  }
                },
                shipper: {
                  select: {
                    id: true,
                    companyName: true,
                    phone: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const token = jwt.sign({ userId: user.id }, config.jwtSecret)
    res.json({
      token,
      ...userDb
    })
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' })
  }
})

export const loginFailed = asyncHandler((req: Request, res: Response) => {
  res.status(401).json({ success: false, message: 'failure' })
})
export const logout = asyncHandler((req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err)
      res.status(500).json({ error: 'Failed to log out' })
    } else {
      console.error('logout called...')
      res.clearCookie('jwt')
      res.clearCookie('token')
      // res.redirect('http://localhost:3000')
      // Corrected line
      res.status(200).json({
        message: 'Logout successfully!!'
      })
    }
  })
})
