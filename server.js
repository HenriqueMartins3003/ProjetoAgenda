//Todas as importações do projeto 
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const {middlewareGlobal,checkCsrfError, csrfCriaToken} = require('./src/Middlewares/middleware')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const helmet = require('helmet')
const csrf = require('csurf')

// mongoose.connect(connectionString).then( ()=> {
//     app.emit('pronto')
// })

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname,'public')))
app.use(helmet())

const seesionOptions = session({
    secret: 'Henrique',
    store: MongoStore.create({ mongoUrl: process.env.connectionString}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 1000 milesimos * segundos * minutos * horas * dias
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(flash())

app.use(seesionOptions)
app.set('views', path.resolve(__dirname,'src','Views'))
app.set('view engine','ejs')

// usando o CSRF
app.use(csrf())

//Meus Middlewares
app.use(middlewareGlobal)
app.use(csrfCriaToken)
app.use(checkCsrfError)

app.use(routes)


async function connectMongoAndServer(connectionString){
  
    try{
        await mongoose.connect(connectionString)
        console.log('MongoDB-Conectado')
        app.listen(3000, ()=> { console.log('Servidor rodando na porta 3000')})
    
    }catch(erro){
        console.log(erro)
    }   
}


connectMongoAndServer(process.env.connectionString)





 