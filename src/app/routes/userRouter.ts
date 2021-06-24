import express, { Request, Response } from 'express'
import { createUserController } from '../useCases/User/CreateUser'

const userRouter = express.Router()

userRouter.post('/signup', (req: Request, res: Response) => {
  return createUserController.handle(req, res)
})

userRouter.post('/login', (req: Request, res: Response) => {
  return res.send('login')
})

export { userRouter }
