require(`dotenv`).config()
const knex = require('../../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' })
        }

        const buscarUsuario = await knex(
            'usuarios').where({ email })
            .first()

        if (buscarUsuario === undefined) {
            return res.status(400).json({ mensagem: 'Usuario e/ou senha inávlido' })
        }

        const senhaValida = await bcrypt.compare(senha, buscarUsuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Usuario e/ou senha inávlido' })
        }

        const { senha: _, ...usuarioLogado } = buscarUsuario
        const token = jwt.sign({ id: buscarUsuario.id }, process.env.JWTPASSWORD, { expiresIn: '8h' })

        return res.status(200).json({ usuario: usuarioLogado, token })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = login