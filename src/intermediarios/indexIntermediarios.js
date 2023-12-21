const intermediarios = {
    autenticacao: require('./autenticacao'),
    camposObrigatoriosCliente: require('./camposObrigatoriosCliente'),
    camposObrigatoriosProduto: require('./camposObrigatoriosProduto'),
    camposObrigatoriosUsuario: require('./camposObrigatoriosUsuario'),
    camposObrigatoriosPedido: require('./camposObrigatoriosPedido'),
    validacoesCategoria: require('./validacoesCategoria'),
    validacoesCliente: require('./validacoesCliente'),
    validacoesUsuario: require('./validacoesUsuario'),
    validacoesProduto: require('./validacoesProduto'),
    validacoesPedido: require('./validacoesPedido'),
    multer: require('./multer')
}

module.exports = intermediarios