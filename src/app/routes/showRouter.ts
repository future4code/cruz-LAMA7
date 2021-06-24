import express, { Request, Response } from 'express'

const showRouter = express.Router()

showRouter.post('/', (req: Request, res: Response) => {
  return res.send('adicionar show')
})

showRouter.get('/search', (req: Request, res: Response) => {
  return res.send('show de uma data')
})

export { showRouter }
