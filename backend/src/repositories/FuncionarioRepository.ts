import type { Funcionario } from '../entities/Funcionario'

export interface FuncionarioRepository {
	// Está com promessa vazia porque não sabiamos o que retornar || ver DEPOIS
	create(funcionario: Funcionario): Promise<Funcionario>
	find(email: string, senha: string): Promise<Funcionario>
}
