import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/css.css'

function Cadastro() {
  const [email, setEmail] = useState('')
  const [usuarioNome, setUsuarioNome] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const URL = "http://localhost:3001/criarUsuario"

  const enviarDados = async (e) => {
    e.preventDefault()
    const dadosUsuario = {
      usuario_nome: usuarioNome,
      email: email,
      password: senha
    };

    await axios.post(URL, dadosUsuario)
      .then(response => {
        console.log("Usuário cadastrado:", response.data)
        navigate('/BatePapo', { state: { dadosUsuario } })
      })
      .catch(error => {
        console.error("Erro:", error)
      });
  }

  return (
    <div className="form-container">
      <div className="div-container">
        <h1 className='h1'>Cadastro</h1>
        <form className='form' onSubmit={enviarDados}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="username">Nome:</label>
            <input type="text" id="username" name="username" onChange={(e) => setUsuarioNome(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" minLength="8" onChange={(e) => setSenha(e.target.value)} required />
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;