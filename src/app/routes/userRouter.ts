import express, { Request, Response } from 'express'
import { createUserController } from '../useCases/CreateUser'

const userRouter = express.Router()

userRouter.post('/signup', (req: Request, res: Response) => {
  return createUserController.handle(req, res)
})

export { userRouter }
