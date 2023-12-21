const knex = require('../../conexao')

const detalharCliente = async (req, res) => {
    try {
        const { id } = req.params
        const obterCliente = await knex.select('*').from('clientes').where({ id }).first()

        if (!obterCliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }

        return res.status(200).json(obterCliente)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = detalharCliente