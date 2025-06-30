import { randomUUID } from 'node:crypto'
import type { FuncionarioRepository } from '../repositories/FuncionarioRepository'
import { Funcionario, type TipoFuncionario } from '../entities/Funcionario'

interface CriarFuncionarioRequest {
	nome: string
	email: string
	senha: string
	tipo: TipoFuncionario
}

interface CriarFuncionarioResponse {
	funcionario: {
		id: string
		nome: string
		email: string
		senha: string
		tipo: TipoFuncionario
	}
}

export class CriarFuncionarioUseCase {
	private funcionarioRepository: FuncionarioRepository

	constructor(funcionarioRepository: FuncionarioRepository) {
		this.funcionarioRepository = funcionarioRepository
	}

	async execute({
		nome,
		email,
		senha,
		tipo,
	}: CriarFuncionarioRequest): Promise<CriarFuncionarioResponse> {
		const funcionarioCriado = await this.funcionarioRepository.create(
			new Funcionario({
				id: randomUUID(),
				nome,
				email,
				senha,
				tipo,
			}),
		)
		return {
			funcionario: {
				id: funcionarioCriado.id,
				nome: funcionarioCriado.nome,
				email: funcionarioCriado.email,
				senha: funcionarioCriado.senha,
				tipo: funcionarioCriado.tipo,
			},
		}
	}
}
