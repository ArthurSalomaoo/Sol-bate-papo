import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import sol150 from '../imgs/sol150.png'

function BatePapo() {
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [mensagens, setMensagens] = useState([]);
    const location = useLocation();
    const dadosUsuario = location.state;
    const socket = useRef(null);

    useEffect(() => {
        const carregarMensagens = async () => {
            const UrlGetMensagem = `http://localhost:3001/mensagens/`;
            try {
                const response = await axios.post(UrlGetMensagem, dadosUsuario.dadosUsuario);
                setMensagens(response.data.map(msg => ({ mensagem: msg.mensagem })));
                console.log("Mensagens carregadas:", response.data);
            } catch (e) {
                console.error("Erro ao carregar mensagens:", e);
            }
        };

        carregarMensagens();

        socket.current = new WebSocket('ws://localhost:3001');

        socket.current.onopen = () => {
            console.log('Conectado ao servidor WebSocket');
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMensagens((prevMensagens) => [...prevMensagens, data]);
        };

        socket.current.onclose = () => {
            console.log('Desconectado do servidor WebSocket');
        };

        socket.current.onerror = (error) => {
            console.error('Erro no WebSocket:', error);
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [dadosUsuario.dadosUsuario]);

    const enviarMensagem = (e) => {
        e.preventDefault();
        const dadosMensagem = {
            id_usuario_rec: receiverId,
            mensagem: message,
        };

        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify(dadosMensagem));
        } else {
            console.error('WebSocket não está aberto');
        }

        // Limpar o formulário
        setReceiverId('');
        setMessage('');
    };

    return (
        <div className='divBatePapo'>
            <div className='titulo'>
                <img src={sol150} alt="Logo" />
                <h1>Sol bate-papo</h1>
            </div>
            <div className='conteudo'>
                <div className='mensagens'>
                    {mensagens.map((msg, index) => (
                        <p key={index}>{msg.mensagem}</p>
                    ))}
                </div>

                <form className='form' onSubmit={enviarMensagem}>
                    <input type="text" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} placeholder="ID do Destinatário" required />
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem" required></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default BatePapo;