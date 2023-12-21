const knex = require('../../conexao')
const { uploadArquivo } = require('../../armazenamentoS3')

const editarProduto = async (req, res) => {

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params
    const { file } = req

    try {

        const inserirProdutos = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        }
        
        if (file){
            const urlArquivo = await uploadArquivo(file.originalname, file.buffer, file.mimetype)
            inserirProdutos.produto_imagem = urlArquivo
        }

        produtoEditado = await knex('produtos').where('id','=', id).update(inserirProdutos)
        .returning(['id', 'descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem'])

        return res.status(201).json(produtoEditado)     
    
  } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = editarProduto