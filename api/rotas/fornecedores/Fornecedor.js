const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
        constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
            this.id = id
            this.empresa = empresa
            this.email = email
            this.categoria = categoria
            this.dataCriacao = dataCriacao
            this.dataAtualizacao = dataAtualizacao
            this.versao = versao
        }

        async criar () {
            this.validar()
            const res = await TabelaFornecedor.inserir({
                empresa: this.empresa,
                email: this.email,
                categoria: this.categoria
            })

            this.id = res.id
            this.dataCriacao = res.dataCriacao
            this.dataAtualizacao = res.dataAtualizacao
            this.versao = res.versao
        }

        async carregar() {
            const fornecedor = await TabelaFornecedor.pegarPorId(this.id)
            this.empresa = fornecedor.empresa
            this.email = fornecedor.email
            this.categoria = fornecedor.categoria
            this.dataCriacao = fornecedor.dataCriacao
            this.dataAtualizacao = fornecedor.dataAtualizacao
            this.versao = fornecedor.versao
        }

        async atualizar(){
            await TabelaFornecedor.pegarPorId(this.id)
            const campos = ['empresa', 'email', 'categoria'] 
            const dadosParaAtualizar = {}

            campos.forEach((campo) => {
                const valor = this[campo]

                if(typeof valor === 'string' && valor.length > 0) {
                    dadosParaAtualizar[campo] = valor
                }
            })

            if (Object.keys(dadosParaAtualizar).length === 0){
                throw new Error('Não foram fornecidos dados para atualizar!')
            }

            await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
        }

        async remover() {
            return await TabelaFornecedor.remover(this.id)
        }

        validar(){
            const campos = ['empresa', 'email', 'categoria']

            campos.forEach(campo => {
                const valor = this[campo]

                if(typeof valor !== 'string' || valor.length === 0) {
                    throw new Error(`O campo '${campo}' está inválido!`)
                }
            })
        }
}

module.exports = Fornecedor