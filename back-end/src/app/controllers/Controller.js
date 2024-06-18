import Repository from "../repositories/Repository.js" 

class Controller { 
    /*async delete(req, res) {
        const id = req.params.id
        const row = await Repository.delete(id)
        res.json(row)    
    }*/

    async usuarios(req, res) {
        const row = await Repository.usuarios()
        res.json(row)
    }

    async mensagens (req, res) {
        const dadosUsuario = req.body
        try {
            const row = await Repository.mensagens(dadosUsuario)
            res.json(row)
        } catch{
            console.error("erro")
        }
    }

    async enviarMensagem (req, res) {
        const dadosMensagem = req.body
        try {
            const row = await Repository.enviarMensagem(dadosMensagem)
            res.status(200).json(row)
        } catch(error) {
            console.error(error)
            res.status(500).json({'erro': error})
        }
    }

    async cadastrarUsuario (req, res) {
        const dadosUsuario = req.body
        try{
            const row = await Repository.cadastrarUsuario(dadosUsuario)
            res.status(201).json(row)
        } catch(error) {
            console.error(error)
            res.status(500).json({'erro': error})
        }
    }

    async login (req, res) {
        const dadosUsuario = req.body
        try {
            const row = await Repository.login(dadosUsuario)
            res.status(200).json(row)
        } catch(error) {
            console.error("erro", error)
        }
    }
}

export default new Controller()