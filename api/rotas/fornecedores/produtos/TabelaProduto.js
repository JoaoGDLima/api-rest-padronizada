const Modelo = require('./ModeloTabelaProduto')

module.exports = {
    listar (idFornecedor) {
        return Modelo.findAll({ 
            where: {
                fornecedor: idFornecedor
            }
        })
    },
    
    
    inserir(dados){
        return Modelo.create(dados)
    },

    async remover(idProduto, idfornecedor){
        return Modelo.destroy({
            where: { 
                id: idProduto, 
                fornecedor: idfornecedor
            }
        })
    }

    /*async pegarPorId(id){
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

*/
}