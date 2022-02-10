const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')


app.use(bodyParser.json())

app.use('/api/fornecedores', roteador)

app.use((err, req, res, next) => {
    let status = 500

    if (err instanceof NaoEncontrado){
        status = 404
    } 
    
    if (err instanceof CampoInvalido || err instanceof DadosNaoFornecidos){
        status = 400  
    }

    if (err instanceof ValorNaoSuportado){
        status = 406
    } 

    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: err.message,
            id: err.idErro   
        })
    )     
})

app.listen(config.get('api.porta'),() => console.log('A API está funcionando!'))