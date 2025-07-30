document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('funcionarioForm')

	form.addEventListener('submit', async (event) => {
		event.preventDefault()

		const name = document.getElementById('name').value
		const email = document.getElementById('email').value
		const senha = document.getElementById('senha').value
		const tipo = document.getElementById('tipo').value

		const newFuncionario = {
			nome: name,
			email: email,
			senha: senha,
			tipo: tipo,
		}

		try {
			await criarFuncionario(newFuncionario)
			console.log('Funcionário registrado com sucesso!')
			form.reset()
			window.location.href = 'login.html'
		} catch (error) {
			console.log(`Erro: ${error.message}`)
		}
	})
})

async function criarFuncionario(funcionario) {
	const response = await fetch('/api/criarFuncionario', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(funcionario),
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData?.error || 'Erro ao criar funcionário')
	}

	return await response.json()
}
