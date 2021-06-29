import { Request, Response } from 'express'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  constructor(private AuthenticateUserUseCase: AuthenticateUserUseCase) {}
  async handle(req: Request, res: Response): Promise<Response | void> {
    try {
      const input: IAuthenticateUserRequestDTO = {
        email: req.body.email,
        password: req.body.password,
      }

      const response = await this.AuthenticateUserUseCase.execute(input)

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }
}
