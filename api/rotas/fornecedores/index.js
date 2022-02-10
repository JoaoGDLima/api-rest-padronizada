const roteador = require("express").Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        

        res.status(201)
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (err) {
        next(err)
    }
})

roteador.get('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        
        res.status(200)
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (err) {
        next(err)
    }
})

roteador.put('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const dados = Object.assign({}, req.body, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()

        res.status(204)
        res.end()
    } catch (err) {
        next(err)
    }
})

roteador.delete('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })    
        
        await fornecedor.carregar()
        await fornecedor.remover()

        res.status(204)
        res.end()
    } catch (err) {
        next(err)
    }
})

module.exports = roteador