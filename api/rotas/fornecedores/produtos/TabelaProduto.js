const Modelo = require('./ModeloTabelaProduto')

module.exports = {
    listar (idFornecedor) {
        return Modelo.findAll({ 
            where: {
                fornecedor: idFornecedor
            }
        })
    }
    
    
    /*inserir(fornecedor){
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id){
        const fornecedor  = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!fornecedor){
            throw new NaoEncontrado()
        }

        return fornecedor
    },
    async atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar, 
            {
                where: { id: id }
            }
        )
    },
    async remover(id){
        return Modelo.destroy({
            where: { id: id }
        })
    }*/
}