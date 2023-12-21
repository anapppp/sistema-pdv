const knex = require('../../conexao')

const listarPedido = async (req, res) => {
    const { cliente_id } = req.query

    try {
        let encontraPedido = knex('pedidos')
        let encontraProdutosDoPedido = knex('pedido_produtos')

        if (cliente_id) {
            const clienteIdValido = await knex('clientes').where('id', cliente_id).first();
            if (!clienteIdValido) {
                return res.status(400).json({ mensagem: "O cliente_id fornecido não é válido." });
            }

            encontraPedido = encontraPedido.where('cliente_id', cliente_id)
            encontraProdutosDoPedido = encontraProdutosDoPedido.join('pedidos', 'pedidos.id', '=', 'pedido_produtos.pedido_id').where('pedidos.cliente_id', cliente_id)
        }

        const todosOspedidos = await encontraPedido
        const todosOsprodutosPedido = await encontraProdutosDoPedido

        const formataSaida = todosOspedidos.slice().sort((a, b) => a.id - b.id).map((pedido) => {
            const pedidoProdutos = todosOsprodutosPedido.filter((produto) => produto.pedido_id === pedido.id).map((produto) => ({
                id: produto.id,
                quantidade_produto: produto.quantidade_produto,
                valor_produto: produto.valor_produto,
                pedido_id: produto.pedido_id,
                produto_id: produto.produto_id,
            }))

            return {
                pedido: {
                    id: pedido.id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id,
                },
                pedido_produtos: pedidoProdutos
            }
        })

        return res.status(200).json(formataSaida)

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = listarPedido