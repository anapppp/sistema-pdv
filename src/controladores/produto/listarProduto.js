const knex = require('../../conexao')

const listarProduto = async (req, res) => {
    const { categoria_id } = req.query

    try {
        
        const todosOsProdutos = await knex('produtos')
        
        if (!categoria_id) {   
            return res.status(200).json(todosOsProdutos)
        }

        const categoriaExiste = await knex('categorias').where('id', categoria_id).first()
            
        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' })


        }

        const produtosListadosPorCategoria = await knex('produtos').where('categoria_id', '=', categoria_id)
            .returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id'])


        if (!produtosListadosPorCategoria) {
            return res.status(400).json({ mensagem: "Categoria não encontrada" })
        }

        return res.status(200).json(produtosListadosPorCategoria)
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = listarProduto