import { Request, Response } from 'express'
import { ICreateBandRequestDTO } from './CreateBandDTO'
import { CreateBandUseCase } from './CreateBandUseCase'

export class CreateBandController {
  constructor(private CreateBandUseCase: CreateBandUseCase) {}
  async handle(req: Request, res: Response): Promise<Response | void> {
    try {
      const input: ICreateBandRequestDTO = {
        name: req.body.name,
        music_genre: req.body.music_genre,
        responsible: req.body.responsible,
        token: req.headers.authorization,
      }

      const response = await this.CreateBandUseCase.execute(input)

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}
