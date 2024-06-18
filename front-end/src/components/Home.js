import React from 'react'
import { Link } from 'react-router-dom';
import '../css/css.css'

function Home() {
  return (
    <div className="div-container">
      <h1 className='h1'>Home</h1>
      <nav>
        <ul>
          <li>
            <Link className='link' to="/Login">Login</Link>
          </li>
          <li>
            <Link className='link' to="/cadastro">Cadastro</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;