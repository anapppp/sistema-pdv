const knex = require('../../conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = await knex('usuarios').insert({
            nome: nome,
            email: email,
            senha: senhaCriptografada
        }).returning(['id', 'nome', 'email'])

        return res.status(201).json(usuario)
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = cadastrarUsuario