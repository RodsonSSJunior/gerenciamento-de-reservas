import { makeCriarFuncionarioUseCase } from '../../useCases/factories/makeCriarFuncionarioUseCase'

import type { RequestHandler } from 'express'
import { z } from 'zod'

const tipoFuncionario = z.enum(['gerente', 'garcom', 'atendente'])

const bodySchema = z.object({
	nome: z.string(),
	email: z.string().email(),
	senha: z.string(),
	tipo: tipoFuncionario,
})

export const criarFuncionarioController: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const { nome, email, senha, tipo } = bodySchema.parse(req.body)
		const criarFuncionarioUseCase = makeCriarFuncionarioUseCase()
		const funcionario = await criarFuncionarioUseCase.execute({
			nome,
			email,
			senha,
			tipo,
		})
		res.status(201).json(funcionario)
		return
	} catch (error) {
		next(error)
	}
}
