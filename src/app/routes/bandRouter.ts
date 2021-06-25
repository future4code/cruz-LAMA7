import express, { Request, Response } from 'express'
import { createBandController } from '../useCases/Band/CreateBand'

const bandRouter = express.Router()

bandRouter.put('/', (req: Request, res: Response) => {
  return createBandController.handle(req, res)
})

bandRouter.get('/search', (req: Request, res: Response) => {
  return res.send('visualizar detalhes da banda nome ou id')
})

export { bandRouter }
