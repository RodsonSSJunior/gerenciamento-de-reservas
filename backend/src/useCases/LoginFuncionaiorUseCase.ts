import { randomUUID } from 'node:crypto'
import type { FuncionarioRepository } from '../repositories/FuncionarioRepository'
import { Funcionario, type TipoFuncionario } from '../entities/Funcionario'

interface LoginFuncionarioRequest {
	email: string
	senha: string
}

interface LoginFuncionarioResponse {
	funcionario: {
		nome: string
		email: string
		tipo: TipoFuncionario
	}
}

export class LoginFuncionarioUseCase {
	private funcionarioRepository: FuncionarioRepository

	constructor(funcionarioRepository: FuncionarioRepository) {
		this.funcionarioRepository = funcionarioRepository
	}

	async execute({
		email,
		senha,
	}: LoginFuncionarioRequest): Promise<LoginFuncionarioResponse> {
		const funcionarioEncontrado = await this.funcionarioRepository.find(
			email,
			senha,
		)
		return {
			funcionario: {
				nome: funcionarioEncontrado.nome,
				email: funcionarioEncontrado.email,
				tipo: funcionarioEncontrado.tipo,
			},
		}
	}
}
