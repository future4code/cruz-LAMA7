import express, { Request, Response } from 'express'

const bandRouter = express.Router()

bandRouter.put('/', (req: Request, res: Response) => {
  return res.send('registrar banda')
})

bandRouter.get('/search', (req: Request, res: Response) => {
  return res.send('visualizar detalhes da banda nome ou id')
})

export { bandRouter }
