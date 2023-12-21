const knex = require('../../conexao')

const listarCliente = async (req, res) => {
    try {
        const cliente = await knex('clientes').returning(["id", "nome", "email", "cpf"])

        return res.status(200).json(cliente)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = listarCliente