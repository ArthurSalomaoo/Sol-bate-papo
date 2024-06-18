import { consulta } from "../database/conexao.js";

class Repository {
    /*delete(id) {
        const sql = "DELETE FROM selecoes WHERE id=?;";
        return consulta(sql, id, "Não foi possível apagar!")
    }*/

    usuarios(){
        const sql = "SELECT * FROM usuarios;"
        return consulta("Usuarios encontrados!", "Usuarios não encontrados!", sql,)
    }

    async mensagens(dadosUsuario) {
        console.log(dadosUsuario)
        const sql = "SELECT id FROM usuarios WHERE usuario_nome = ? AND password = ?";
        const valores = [dadosUsuario.usuario_nome, dadosUsuario.password]
        const resultado = await consulta("", "Dados incorretos!", sql, valores)
        console.log(resultado[0].id)
        if(resultado.length > 0){
        const id = resultado[0].id
        const sql = "SELECT * FROM mensagens WHERE id_usuario_rec = ?;"
        return consulta("Mensagens encontradas!", "Mensagens não encontradas", sql, id)
        } else {
            console.log("Dados incorretos")
            return false
        }

    }

    enviarMensagem(dadosMensagem) {
        const sql = "INSERT INTO mensagens (id_usuario_env, id_usuario_rec, mensagem, criado_em) VALUES (?, ?, ?, NOW());"
        const valores = [dadosMensagem.id_usuario_env, dadosMensagem.id_usuario_rec, dadosMensagem.mensagem]
        return consulta("Mensagem registrada!", "Não foi possível enviar a mensagem!", sql, valores)
      }

    cadastrarUsuario(dadosUsuario) {
        const sql = "INSERT INTO usuarios (usuario_nome, email, password) VALUES (?, ?, ?);"
        const valores = [dadosUsuario.usuario_nome, dadosUsuario.email, dadosUsuario.password]
        return consulta("Usuario criado!", "Não foi possível cadastrar o usuário!", sql, valores)
    }
    async login(dadosUsuario) {
        const sql = "SELECT * FROM usuarios WHERE usuario_nome = ? AND password = ?;"
        const valores = [dadosUsuario.usuario_nome, dadosUsuario.password]
        const resultado = await consulta("", "Dados incorretos!", sql, valores)
        if(resultado.length > 0){
            console.log("Dados corretos")
            return true
        } else {
            console.log("Dados incorretos")
            return false
        }
    }
}

export default new Repository()