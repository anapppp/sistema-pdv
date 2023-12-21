const knex = require('../conexao')

const edicao = async (req, res, next) => {
    const { email } = req.body

    try {
        const verificarEmail = await knex('usuarios').where('email', '=', email).first()

        if (verificarEmail && verificarEmail.email != req.usuario.email) {
            return res.status(404).json({ mensagem: "Email já cadastrado" })
        }

        if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            return res.status(404).json("Email inválido.")
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

const cadastro = async (req, res, next) => {
    const { email } = req.body
    try {
        const verificarEmail = await knex('usuarios').where('email', '=', email).first()
        if (verificarEmail) {
            return res.status(404).json({ mensagem: "Email já cadastrado" })
        }

        if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            return res.status(404).json("Email inválido.")
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = { edicao, cadastro }