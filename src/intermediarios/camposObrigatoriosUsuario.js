const camposObrigatoriosUsuario = async (req, res, next) => {
    const { nome, email, senha } = req.body
    try {
        if (!nome || !email || !senha) {
            return res.status(404).json({ mensagem: 'Campos nome, email e senha obrigatórios' })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = camposObrigatoriosUsuario