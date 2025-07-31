import type { Database } from 'sqlite'
import { getConnection } from '../../Datenbank/configdb'
import { isFuncionario } from '../../utils/isFuncionario'
import { Funcionario } from '../../entities/Funcionario'
import type { FuncionarioRepository } from '../FuncionarioRepository'
import bcrypt from 'bcrypt'

export class SqliteFuncionarioRepository implements FuncionarioRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}
	async create(funcionario: Funcionario): Promise<Funcionario> {
		const passwordHash = await this.passwordHash(funcionario.senha)
		await this.db.run(
			'INSERT INTO Funcionario (id, nome, email, senha, tipo) VALUES (?, ?, ?, ?, ?)',
			[
				funcionario.id,
				funcionario.nome,
				funcionario.email,
				passwordHash,
				funcionario.tipo,
			],
		)
		const funcionarioCriado = await this.db.get(
			'SELECT * FROM Funcionario WHERE id = ?',
			[funcionario.id],
		)
		if (!funcionarioCriado) {
			throw new Error('Funcionario criado, mas não encontrado.')
		}
		if (isFuncionario(funcionarioCriado)) {
			return new Funcionario({
				id: funcionarioCriado.id,
				nome: funcionarioCriado.nome,
				email: funcionarioCriado.email,
				senha: funcionario.senha,
				tipo: funcionarioCriado.tipo,
			})
		}
		throw new Error('Dados da reserva inválidos.')
	}

	async passwordHash(senha: string): Promise<string> {
		const salto = 10
		const hashpassword = await bcrypt.hash(senha, salto)
		return hashpassword
	}

	async find(email: string, senha: string): Promise<Funcionario> {
		const funcionario = await this.db.get(
			'SELECT * FROM Funcionario WHERE email = ?',
			[email],
		)
		const isValid = await bcrypt.compare(senha, funcionario.senha)
		if (!isValid) {
			throw new Error('Usuário ou Senha incorreto.')
		}
		return new Funcionario({
			id: funcionario.id,
			nome: funcionario.nome,
			email: funcionario.email,
			senha: funcionario.senha,
			tipo: funcionario.tipo,
		})
	}
}
