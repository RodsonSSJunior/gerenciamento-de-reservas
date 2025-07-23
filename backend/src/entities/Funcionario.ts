export type TipoFuncionario = 'gerente' | 'garcom' | 'atendente'

export interface FuncionarioRequest {
	id: string
	nome: string
	email: string
	senha: string
	tipo: TipoFuncionario
}
export class Funcionario {
	private readonly _id: string
	private readonly _nome: string
	private readonly _email: string
	private readonly _senha: string
	private readonly _tipo: TipoFuncionario

	constructor({ id, nome, email, senha, tipo }: FuncionarioRequest) {
		// Outras validações podem ser adicionadas aqui,
		// podem ser criados metodos para isso
		this._id = id
		this._nome = nome
		this._email = email
		this._senha = senha
		this._tipo = tipo
	}

	get id(): string {
		return this._id
	}

	get nome(): string {
		return this._nome
	}

	get email(): string {
		return this._email
	}

	get senha(): string {
		return this._senha
	}

	get tipo(): TipoFuncionario {
		return this._tipo
	}
}
