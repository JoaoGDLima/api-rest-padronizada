const roteador = require('express').Router({ mergeParams: true })
const TabelaProduto = require('./TabelaProduto')
const Produto = require('./Produto')
const Serializador = require('../../../Serializador').SerializadorProduto

roteador.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.fornecedor.id)
    const serializador = new Serializador(
        res.getHeader('Content-Type')
    )

    res.send(
        serializador.serializar(produtos)  
    )
})

roteador.post('/', async (req, res, next) => {
    
    try{
        const idFornecedor = req.fornecedor.id
        const corpo = req.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor }) 
        const produto = new Produto(dados)
        await produto.criar()
    
        const serializador = new Serializador(
            res.getHeader('Content-Type')
        )

        res.status(201)
        res.send(
            serializador.serializar(produto)
        )
    } catch (err) {
        next(err)
    }

})

roteador.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.id
    }
  

    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
});

roteador.get('/:id', async (req, res, next) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()

        const serializador = new Serializador(
            res.getHeader('Content-Type'),
            ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.send(
           serializador.serializar(produto)  
        )
    } catch (err) {
        next(err)
    }
})

roteador.put('/:id', async (req, res, next) => {
    try {
        const dados = Object.assign(
            {},
            req.body,
            {
                id: req.params.id,
                fornecedor: req.fornecedor.id
            }
        )

        const produto = new Produto(dados)
        await produto.atualizar()
        res.status(204)
        res.end()
    } catch (err) {
        next(err)
    }
})

roteador.post('/:id/diminuir-estoque', async (req, res, next) => {
    try {
        const produto = new Produto({
            id: req.params.id,
            fornecedor: req.fornecedor.id
        })  
 
        await produto.carregar()
        produto.estoque = produto.estoque - req.body.quantidade
        await produto.diminuirEstoque()
        res.status(204)
        res.end()
    } catch (err) {
        next(err)
    }
})

module.exports = roteador