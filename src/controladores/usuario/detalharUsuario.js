const knex = require('../../conexao')

const detalharUsuario = async (req, res) => {
    try {
        const [usuario] = await knex.select().from("usuarios").where({ id: req.usuario.id })
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' })
        }

        return res.status(200).json({
            "id": usuario.id,
            "nome": usuario.nome,
            "email": usuario.email
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = detalharUsuario