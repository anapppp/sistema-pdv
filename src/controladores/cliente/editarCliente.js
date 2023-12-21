const knex = require("../../conexao")

async function editarCliente(req, res) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params

    try {
        const cliente = await knex('clientes').where({ id }).first()
        if (!cliente) {
            return res.status(400).json({ mensagem: "O id informado não pertence a um cliente." })
        }

        await knex('clientes').update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).where({ id })

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = editarCliente