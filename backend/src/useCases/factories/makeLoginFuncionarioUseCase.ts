import { LoginFuncionarioUseCase } from '../LoginFuncionaiorUseCase'
import { SqliteFuncionarioRepository } from '../../repositories/sqlite/SqliteFuncionarioRepository'

export const makeLoginFuncionarioUseCase = (): LoginFuncionarioUseCase => {
	const funcionarioRepository = new SqliteFuncionarioRepository()
	const loginFuncionarioUseCase = new LoginFuncionarioUseCase(
		funcionarioRepository,
	)
	return loginFuncionarioUseCase
}
