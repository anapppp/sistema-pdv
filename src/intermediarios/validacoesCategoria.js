const knex = require('../conexao')

async function validacoesCategoria(req, res, next) {
    const { categoria_id } = req.body

    if (!categoria_id) {
        return res.status(404).json({ mensagem: 'Todos os campos são obrigatórios.' })
    }

    if (categoria_id < 0) {
        return res.status(404).json({ mensagem: 'Todos os números informados devem ser valores positivos.' })
    }

    try {
        const categoriaExiste = await knex('categorias').where('id', categoria_id).first()

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = validacoesCategoria