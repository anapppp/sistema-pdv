const camposObrigatoriosCliente = (req, res, next) => {
    const { nome, email, cpf } = req.body
    try {
        if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: "Nome, email e CPF são obrigatórios." })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = camposObrigatoriosCliente