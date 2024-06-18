import { Router } from 'express'
import Controller from './app/controllers/Controller.js'

const router = Router()
/*router.delete('/selecoes/:id', Controller.delete)*/
router.get('/', Controller.usuarios)
router.post('/mensagens/', Controller.mensagens)
router.post('/enviarMensagem/', Controller.enviarMensagem)
router.post('/criarUsuario', Controller.cadastrarUsuario)
router.post('/login', Controller.login)


export default router