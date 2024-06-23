import React from 'react'
import { Link } from 'react-router-dom';
import '../css/home.css'

function Home() {
  return (
    <div id="home">
      <h1 className=''>Home</h1>
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