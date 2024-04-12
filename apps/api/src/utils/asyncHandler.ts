import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void | Promise<string>

const asyncHandler = (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('error : ', error)
      return res.status(400).json({ message: error.message })
    }

    if (error instanceof Error) {
      console.log('error : ', error)
      return res.status(400).json({ message: error.message })
    }
  }
}

export default asyncHandler
