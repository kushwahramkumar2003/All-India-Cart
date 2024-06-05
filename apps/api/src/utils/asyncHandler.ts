import { Request, Response, NextFunction } from 'express'
import z, { ZodError } from 'zod'

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void | Promise<string>

const asyncHandler = (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    }
    if (error instanceof Error) {
      console.log('error : ', error)
      return res.status(400).json({ error: error.message })
    }
  }
}

export default asyncHandler
