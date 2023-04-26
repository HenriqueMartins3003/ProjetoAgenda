const Contato = require('../Models/ContatoModel')

exports.index = (req,res) => {
    res.render('contato', {ctt:{ }})
}

exports.register = async (req,res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect('/contato/index')
            })
            return
        }

        req.flash('success', 'Seu usuario foi criado com sucesso')
        req.session.save(function () {
            return res.redirect(`/contato/index/${contato.contato._id}`)
        })

    } catch (error) {
        console.log(error)
        res.render('404')
    }
}

exports.editContact = async (req,res)=> {
    if(!req.params.id) return res.render('404')
    
    const contato = new Contato(req.body)
    
    try{    
        const ctt = await contato.getContato(req.params.id)
        if(!ctt){ return res.render('404') }
        
        res.render('contato',{ ctt })
    }catch(error){
        console.log(error)
        res.render('404')
    }
       
}

exports.edit = async (req,res)=> {
    if(!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    try{
        await contato.edit(req.params.id)
        
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect('/contato/index')
            })
            return
        }

        req.flash('success', 'Seu usuario foi editado com sucesso')
        req.session.save(function () {
            return res.redirect(`/contato/index/${contato.contato._id}`)
        })

    }catch(error){
        console.log(error)
        res.render('404')
    }

}

exports.deleteContato = async (req,res) => {
    if(!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    try{
        contato.deleteContato(req.params.id)
        
        if(!contato) return res.render('404')

        req.flash('success', 'Seu usuario foi deletado com sucesso')
        req.session.save(function () {
            return res.redirect(`/`)
        })

    }catch(error){
        console.log(error)
        res.render('404')
    }

}


