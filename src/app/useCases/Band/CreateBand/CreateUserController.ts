import { Request, Response } from 'express'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private CreateUserUseCase: CreateUserUseCase) {}
  async handle(req: Request, res: Response): Promise<Response | void> {
    try {
      const input: ICreateUserRequestDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
      }

      const response = await this.CreateUserUseCase.execute(input)

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}
