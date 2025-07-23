import { CriarFuncionarioUseCase } from '../CriarFuncionarioUseCase'
import { SqliteFuncionarioRepository } from '../../repositories/sqlite/SqliteFuncionarioRepository'

export const makeCriarFuncionarioUseCase = (): CriarFuncionarioUseCase => {
	const funcionarioRepository = new SqliteFuncionarioRepository()
	const criarFuncionarioUseCase = new CriarFuncionarioUseCase(
		funcionarioRepository,
	)
	return criarFuncionarioUseCase
}
