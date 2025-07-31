function mostrarSenha() {
	const senha = document.getElementById('password')
	const icone = document.querySelector('.bx.bxs-show, .bx.bxs-hide')
	if (senha.type === 'password') {
		senha.type = 'text'
		icone.classList.remove('bxs-show')
		icone.classList.add('bxs-hide')
	} else {
		senha.type = 'password'
		icone.classList.remove('bxs-hide')
		icone.classList.add('bxs-show')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('form-login')

	form.addEventListener('submit', async (event) => {
		event.preventDefault()

		const email = document.getElementById('email').value
		const senha = document.getElementById('senha').value

		try {
			const data = await loginFuncionario(email, senha)
			console.log(email, senha)
			console.log('Funcionário logado com sucesso!')

			// Redireciona com base no tipo de funcionário
			if (data.funcionario.tipo === 'atendente') {
				window.location.href = 'attendent.html'
			} else if (data.funcionario.tipo === 'garcom') {
				window.location.href = 'waiter.html'
			} else if (data.funcionario.tipo === 'gerente') {
				window.location.href = 'manager.html'
			} else {
				alert('Tipo de funcionário desconhecido.')
			}
		} catch (error) {
			console.log(`Erro: ${error.message}`)
			alert(error.message)
		}
	})
})

async function loginFuncionario(email, senha) {
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, senha }),
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData?.error || 'Erro ao logar funcionário')
	}

	return await response.json()
}
