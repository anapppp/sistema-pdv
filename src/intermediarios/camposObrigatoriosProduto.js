function camposObrigatoriosProduto(req, res, next) {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    try {
        if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
            return res.status(404).json({ mensagem: 'Todos os campos são obrigatórios.' })
        }
        if (descricao < 0 || quantidade_estoque < 0) {
            return res.status(400).json({ mensagem: 'Todos os números informados devem ser valores positivos.' })
        }
        if (valor <= 0) {
            return res.status(400).json({ mensagem: 'O valor do produto deve ser maior do que zero.' })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = camposObrigatoriosProduto