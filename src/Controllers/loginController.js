const { async } = require('regenerator-runtime')
const Login = require('../Models/LoginModel')

exports.index = (req,res)=>{
    
    res.render('login')
}

exports.register = async (req,res) =>{
    
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('/login/')
            })
            return
        }

        req.flash('success', 'Seu usuario foi criado com sucesso')
            req.session.save(function () {
                return res.redirect('/login/')
            })
        
        
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.login = async (req,res) =>{
    
    try {
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('/login/')
            })
            return
        }

        req.flash('success', 'Você está logado!')
        req.session.user = login.user
        req.session.save(function () {
            return res.redirect('/')
        })
        
        
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.logout = async (req,res) =>{
    req.session.destroy()
    res.redirect('/')
}