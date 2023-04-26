//Meu middleWare Global
exports.middlewareGlobal = (req,res,next)=>{
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.users = req.session.user


    next()
}

//Meu MiddleWare de erro do CSRF
exports.checkCsrfError = (err,req,res,next) => {
    if(err && 'EBADCSRFTOKEN' === err.code) {
        console.log(err.code)
        return res.render('404')
    }
    next()       
}
//Criador de Token do CSRF
exports.csrfCriaToken = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req,res,next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login para acessar essa página!')
        req.session.save(() => res.redirect('/') )
        return
    }
    next()
}
