import { Router } from 'express'
import { bandRouter } from './bandRouter'
import { showRouter } from './showRouter'
import { userRouter } from './userRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/band', bandRouter)
router.use('/show', showRouter)

export { router }
