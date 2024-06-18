import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../css/css.css'

function Login() {
  const [usuarioNome, setUsuarioNome] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const URL = "http://localhost:3001/login";

  function enviarDados() {


    const dadosUsuario = {
      usuario_nome: usuarioNome,
      password: password
    };

    axios.post(URL, dadosUsuario)
      .then(response => {
        if (response.data) {
          console.log("Login realizado:", response.data);
          navigate('/BatePapo', 
            {state: { dadosUsuario}}
          );
        
        } else {
          console.log("Dados incorretos")
        }
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  }

  return (
    <div className="div-container">

      <h1 className='h1'>Login</h1>
      <form className='form'>

        <div className="form-group">
          <label htmlFor="username">Nome:</label>
          <input type="text" id="username" name="username" onChange={(e) => setUsuarioNome(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" minLength="8" onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="button" onClick={enviarDados}>Logar</button>
      </form>
    </div>
  );
}

export default Login;