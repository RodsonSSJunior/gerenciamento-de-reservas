import type { Database } from 'sqlite'
import { getConnection } from '../../Datenbank/configdb'
import { isFuncionario } from '../../utils/isFuncionario'
import { Funcionario } from '../../entities/Funcionario'
import type { FuncionarioRepository } from '../FuncionarioRepository'

export class SqliteFuncionarioRepository implements FuncionarioRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}
	async create(funcionario: Funcionario): Promise<Funcionario> {
		await this.db.run(
			'INSERT INTO Funcionario (id, nome, email, senha, tipo) VALUES (?, ?, ?, ?, ?)',
			[
				funcionario.id,
				funcionario.nome,
				funcionario.email,
				funcionario.senha,
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
				senha: funcionarioCriado.senha,
				tipo: funcionarioCriado.tipo,
			})
		}
		throw new Error('Dados da reserva inválidos.')
	}
}
