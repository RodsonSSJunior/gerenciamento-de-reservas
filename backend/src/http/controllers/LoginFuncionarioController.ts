import { makeLoginFuncionarioUseCase } from '../../useCases/factories/makeLoginFuncionarioUseCase'

import type { RequestHandler } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
	email: z.string(),
	senha: z.string(),
})

export const loginFuncionarioController: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const { email, senha } = bodySchema.parse(req.body)
		const loginFuncionarioUseCase = makeLoginFuncionarioUseCase()
		const funcionario = await loginFuncionarioUseCase.execute({
			email,
			senha,
		})
		res.status(201).json(funcionario)
		return
	} catch (error) {
		next(error)
	}
}
