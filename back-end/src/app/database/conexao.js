import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bate_papo'
})

conexao.connect()

export const consulta = (mensagemSucesso, mensagemErro, sql, valores='') => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) { 
                console.error(erro)
                return reject(mensagemErro)
            }
            const row = JSON.parse(JSON.stringify(resultado))
            /*const rowOBJ = {
                row: row,
                mensagemSucesso: mensagemSucesso
            }*/
            console.log(mensagemSucesso)
            return resolve(row)
        })
    })
}

export default conexao