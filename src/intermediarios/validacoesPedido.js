const knex = require('../conexao')

const validarCliente = async (req, res, next) => {
    const { cliente_id } = req.body
    try {
        const cliente = await knex('clientes').where({ id: cliente_id }).first()
        if (!cliente) {
            return res.status(404).json({ mensagem: "Pedido não gerado porque o cliente não foi encontrado." })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = { validarCliente }