const knex = require('../../conexao')
const send = require('../../email')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, pedido_produtos, observacao } = req.body

    try {
        let valorTotal = 0

        for (let item of pedido_produtos) {
            let produto = await knex('produtos').where({ id: item.produto_id }).first()

            if (!produto) {
                return res.status(404).json({ mensagem: `O produto ${item.produto_id} não foi encontrado.` })
            } else {
                if (item.quantidade_produto > produto.quantidade_estoque) {
                    return res.status(404).json({ mensagem: `A quantidade em estoque do produto de ID ${item.produto_id} é ${produto.quantidade_estoque}.` })
                } else {
                    valorTotal += produto.valor * item.quantidade_produto
                    item.valor_produto = produto.valor
                    item.quantidade_estoque = produto.quantidade_estoque
                }
            }
        }

        const novoPedido = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorTotal
        }).returning('*')

        for (let item of pedido_produtos) {
            await knex('pedido_produtos').insert({
                pedido_id: novoPedido[0].id,
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: item.valor_produto
            }).returning('*')
        }

        const cliente = await knex('clientes').where({ id: cliente_id }).first()
        if (cliente.email) {
            await send(cliente.email,
                'Pedido efetuado com sucesso',
                `Olá, ${cliente.nome}!
            
            Seu pedido foi efetuado com sucesso!`)
        }

        return res.status(201).json({ mensagem: "Pedido efetuado com sucesso." })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = cadastrarPedido