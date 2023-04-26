//import './assets/css/style.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/Login'



const login = new Login('.form-login')
const cadastroForm = new Login('.form-cadastro')

login.init()
cadastroForm.init()






