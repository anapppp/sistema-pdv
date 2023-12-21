const knex = require('../../conexao')
const { uploadArquivo } = require('../../armazenamentoS3')

async function cadastrarProduto(req, res) {
    const { descricao, quantidade_estoque, valor, categoria_id} = req.body
    const {file} = req   
    
    
    try{                
        const inserirProdutos = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }
        
        if (file){
            const urlArquivo = await uploadArquivo(file.originalname, file.buffer, file.mimetype)
            inserirProdutos.produto_imagem = urlArquivo
        }

        produtoCadastrado = await knex('produtos').insert(inserirProdutos)
        .returning(['id', 'descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem'])

       
       return res.status(201).json(produtoCadastrado)
        
    } catch (error) { 
        
        return res.status(500).json(error.message)
    }
}

module.exports = cadastrarProduto 
