import { Router } from 'express'
import { criarRelatorioReservaPorPeriodoController } from '../http/controllers/CriarRelatorioReservasPorPeriodoController'
import { criarRelatorioReservasPorMesaController } from '../http/controllers/CriarRelatorioReservasPorMesaController'
import { criarRelatorioReservasPorGarcomController } from '../http/controllers/CriarRelatorioReservasPorGarcomController'
import { criarFuncionarioController } from '../http/controllers/CriarFuncionarioController'

const router = Router()
router.get(
	'/relatorios/reservas-atendidas',
	criarRelatorioReservaPorPeriodoController,
)
router.get(
	'/relatorios/reservas-mesa/:mesaId',
	criarRelatorioReservasPorMesaController,
)
router.get(
	'/relatorios/mesas-confirmadas',
	criarRelatorioReservasPorGarcomController,
)

router.post('/criarFuncionario', criarFuncionarioController)
export { router as gerenteRouter }
