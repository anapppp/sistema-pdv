const knex = require('../conexao')

const cadastro = async (req, res, next) => {
    const { email, cpf } = req.body

    try {
        const verificarEmail = await knex('clientes').where({ email }).first()
        if (verificarEmail) {
            return res.status(404).json({ mensagem: "Email já cadastrado." })
        }

        const verificarCpf = await knex('clientes').where({ cpf }).first()
        if (verificarCpf) {
            return res.status(400).json({ mensagem: "CPF já cadastrado." })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

const edicao = async (req, res, next) => {
    const { email, cpf } = req.body
    try {
        const verificarEmail = await knex('clientes').where({ email }).first()
        if (verificarEmail && verificarEmail.email != email) {
            return res.status(404).json({ mensagem: "Email já cadastrado." })
        }

        const verificarCpf = await knex('clientes').where({ cpf }).first()
        if (verificarCpf && verificarCpf.cpf != cpf) {
            return res.status(400).json({ mensagem: "CPF já cadastrado." })
        }

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Falha na autenticação." })
    }
}

module.exports = { edicao, cadastro }