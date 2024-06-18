import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/css.css'
import sol150 from '../imgs/sol150.png'


function BatePapo() {
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [usuarioId, setUsuarioId] = useState('')
    const [mensagens, setMensagens] = useState('')

    const location = useLocation();
    const dadosUsuario = location.state;

    const enviarMensagem = async (e) => {
        e.preventDefault();
        const URL = 'http://localhost:3001/enviarMensagem/';
        const dadosMensagem = {
            id_usuario_rec: receiverId,
            mensagem: message
        };

        try {
            const response = await axios.post(URL, dadosMensagem);
            console.log('Mensagem enviada:', response.data);
            // Limpar o formulário
            setReceiverId('');
            setMessage('');
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
        }
    };

    const carregarMensagens = async () => {
        const UrlGetMensagem = `http://localhost:3001/mensagens/`
        console.log(UrlGetMensagem)
        try {
            const response = await axios.post(UrlGetMensagem, dadosUsuario.dadosUsuario)
            setMensagens(response.data[1].mensagem)
            console.log("Mensagens", response.data[1].mensagem)
        } catch (e) {
            console.error("erro:", e)
        }
    }

    return (
        <div className='divBatePapo' onLoad={carregarMensagens}>
            <div className='titulo'>
                <img src={sol150} />
                <h1>Sol bate-papo</h1>
            </div>
            <div className='conteudo'>
                <div className='mensagens'>
                    <p>{mensagens}</p>
                </div>

                <form className='form' onSubmit={enviarMensagem}>

                    <input type="text" onChange={(e) => setReceiverId(e.target.value)} placeholder="ID do Destinatário" required />

                    <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem" required></textarea>

                    <button type="submit">Enviar</button>
                </form>

            </div>
        </div>
    );
}

export default BatePapo;