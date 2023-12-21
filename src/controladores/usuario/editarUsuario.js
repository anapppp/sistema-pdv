const bcrypt = require("bcrypt")
const knex = require("../../conexao")

async function editarUsuario(req, res) {
  const { nome, email, senha } = req.body
  const { usuario } = req

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    await knex("usuarios").where("id", usuario.id).update({
      nome,
      email,
      senha: senhaCriptografada,
    })

    return res.status(204).json()

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}

module.exports = editarUsuario