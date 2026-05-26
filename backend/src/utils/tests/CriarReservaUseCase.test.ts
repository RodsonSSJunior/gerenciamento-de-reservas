import { CriarReservaUseCase } from '../../useCases/CriarReservaUseCase'
import { Reserva } from '../../entities/Reserva'
import { validateHorarioError } from '../../useCases/erros/validateHorarioError'

describe('QA - CriarReservaUseCase', () => {
    let sut: CriarReservaUseCase
    let  reservaRepositoryMock: any
    let  mesaRepositoryMock: any

    beforeEach(() => {
        // Crie os seus mocks (exemplo genérico, ajuste conforme seu framework de testes, ex: Jest)
        reservaRepositoryMock = {
            buscarReservasPorHorarioNoDia: jest.fn(),
            create: jest.fn().mockImplementation((reserva) => Promise.resolve(reserva))
        }
        // 💡 AJUSTE ESTE BLOCO AQUI:
        mesaRepositoryMock = {
            updateConfirmar: jest.fn().mockResolvedValue({})
        }
        

        // Instancie o SUT passando os mocks necessários no construtor
        sut = new CriarReservaUseCase(reservaRepositoryMock, mesaRepositoryMock)
    })

    test.each([
        // mesaId | hora    | status antigo | motivo do teste
        [ 10,       "21:00",  "aguardando",   "Mesma mesa, mas horário diferente" ],
        [ 11,       "20:00",  "aguardando",   "Mesmo horário, mas mesa diferente" ],
        [ 10,       "20:00",  "cancelada",    "Mesma mesa e hora, mas a reserva antiga foi cancelada" ],
    ])('Deve permitir a reserva quando: %s', async (mesaId, hora, statusAntigo, motivo) => {
        
        // 1. ARRANGE (O Mock assume os valores da linha da tabela automaticamente)
        const reservaExistente = new Reserva({
            id: 'id-antigo',
            nomeResponsavel: "Rodson Silva",
            mesaId: 10, // A reserva do banco sempre estará na mesa 10 às 20:00
            hora: "20:00",
            data: "2026-06-30",
            quantidadePessoas: 2,
            status: statusAntigo as any // Mudando o status de acordo com a tabela
        })
        reservaRepositoryMock.buscarReservasPorHorarioNoDia.mockResolvedValue([reservaExistente])

        // Dados da NOVA reserva que o usuário está tentando fazer
        const request = {
            mesaId: mesaId, // Mudando a mesa de acordo com a tabela
            nomeResponsavel: "Rodson Silva",
            data: "2026-06-30",
            hora: hora,     // Mudando a hora de acordo com a tabela
            quantidadePessoas: 4
        }

        // 2. ACT
        const resposta = await sut.execute(request)

        // 3. ASSERT (Como mudamos um dos fatores, o sistema TEM QUE deixar passar com sucesso)
        expect(resposta.reserva).toHaveProperty('id')
    })
})