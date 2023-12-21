const knex = require('../../conexao')

const detalharProduto = async (req, res) => {
    try {
        const { id } = req.params
        const obterProduto = await knex.select('*').from('produtos').where({ id }).first()

        if (!obterProduto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }

        return res.status(200).json(obterProduto)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = detalharProduto