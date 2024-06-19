import { Request, Response, NextFunction } from 'express'
import z, { ZodError } from 'zod'
import logger from './logger'

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void

const asyncHandler = (fn: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      if (error instanceof ZodError) {
        logger.error(`Zod validation error: ${JSON.stringify(error.errors)}`)
        res.status(400).json({ error: error.errors })
      } else if (error instanceof Error) {
        logger.error(`Error: ${error.message}`)
        res.status(500).json({ error: error.message })
      } else {
        logger.error('Unknown error occurred')
        res.status(500).json({ error: 'Unknown error occurred' })
      }
    }
  }
}

export default asyncHandler
