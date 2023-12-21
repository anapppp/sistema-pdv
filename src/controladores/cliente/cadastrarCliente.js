const knex = require('../../conexao')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        const novoCliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning(['id', 'nome', 'email', 'cpf', 'cep', 'rua', 'numero', 'bairro',])

        return res.status(201).json(novoCliente)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = cadastrarCliente