import type { Funcionario } from '../entities/Funcionario.ts'

export function isFuncionario(funcionario: unknown): funcionario is {
	id: Funcionario['id']
	nome: Funcionario['nome']
	email: Funcionario['email']
	senha: Funcionario['senha']
	tipo: Funcionario['tipo']
} {
	return (
		typeof funcionario === 'object' &&
		funcionario !== null &&
		'id' in funcionario &&
		'nome' in funcionario &&
		'email' in funcionario &&
		'senha' in funcionario &&
		'tipo' in funcionario &&
		typeof funcionario.id === 'string' &&
		typeof funcionario.nome === 'string' &&
		typeof funcionario.email === 'string' &&
		typeof funcionario.senha === 'string' &&
		typeof funcionario.tipo === 'string'
	)
}
