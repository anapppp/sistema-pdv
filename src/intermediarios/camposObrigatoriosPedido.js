const camposObrigatoriosPedido = (req, res, next) => {
    const { cliente_id, pedido_produtos } = req.body

    try {
        if (!cliente_id || !pedido_produtos) {
            return res.status(400).json({ mensagem: "cliente_id, pedido_produtos são campos obrigatórios." })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = camposObrigatoriosPedido