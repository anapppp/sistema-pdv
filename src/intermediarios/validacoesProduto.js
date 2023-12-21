const knex = require('../conexao')

const editar = async (req, res, next) => {
    const { id } = req.params
    const produto = await knex('produtos').where({ id }).first()
    try {
        if (!produto) {
            return res.status(404).json({ mensagem: 'O produto não consta na base de dados.' })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = { editar }
