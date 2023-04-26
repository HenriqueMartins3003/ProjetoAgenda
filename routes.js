const express = require('express')
const route = express.Router()
const homeController = require('./src/Controllers/homeController')
const loginController = require('./src/Controllers/loginController')
const contatoController = require('./src/Controllers/contatoController')
const { loginRequired } = require('./src/Middlewares/middleware')

//rotas da Home
route.get('/', homeController.index)

//rotas de login
route.get('/login/',loginController.index)
route.post('/login/register',loginController.register)
route.post('/login/login',loginController.login)
route.get('/login/logout',loginController.logout)

//Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register',contatoController.register)
route.get('/contato/index/:id',contatoController.editContact)
route.post('/contato/edit/:id',contatoController.edit)
route.get('/contato/delete/:id',contatoController.deleteContato)


module.exports = route

