import express, { Request, Response } from 'express'
import { authenticateUserController } from '../useCases/User/AuthenticateUser'
import { createUserController } from '../useCases/User/CreateUser'

const userRouter = express.Router()

userRouter.post('/signup', (req: Request, res: Response) => {
  return createUserController.handle(req, res)
})

userRouter.post('/login', (req: Request, res: Response) => {
  return authenticateUserController.handle(req, res)
})

export { userRouter }
