const knex = require('../../conexao')

const listarCategoria = async (req, res) => {
    try {
       const categoria = await knex('categorias').returning(['id', 'descricao'])
        return res.status(200).json(categoria)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = listarCategoria