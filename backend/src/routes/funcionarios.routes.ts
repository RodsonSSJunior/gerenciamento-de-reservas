import { Router } from 'express'
import { loginFuncionarioController } from '../http/controllers/LoginFuncionarioController'

const router = Router()

router.post('/login', loginFuncionarioController)

export { router as funcionariosRouter }
