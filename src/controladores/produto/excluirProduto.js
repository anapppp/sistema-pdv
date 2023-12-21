const knex = require('../../conexao')
const { excluirArquivo } = require('../../armazenamentoS3')

const excluirProduto = async (req, res) => {

  const { id } = req.params
  
    try {

    const produto = await knex('produtos').where({ id }).first()
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' })
    }

       const produtoVinculadoPedido = await knex('pedido_produtos').where({ produto_id: id }).first()
    if (produtoVinculadoPedido) {
      return res.status(400).json({ mensagem: 'Não é possivel excluir o produto, pois está vinculado a um pedido' })
    }

    const deletarProduto = await knex('produtos').where({ id }).del()
    
       
    if(produto.produto_imagem){
      const spliturl = produto.produto_imagem.split('/')
      const path = spliturl.reverse()[0]
      await excluirArquivo(path)
    }

    if (deletarProduto > 0) {
      return res.status(200).json({ mensagem: 'Produto excluído' })
    }
  

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}
module.exports = excluirProduto