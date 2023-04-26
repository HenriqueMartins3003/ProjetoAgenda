const Contato = require("../Models/ContatoModel")

exports.index = async (req, res) => {
    const contato = new Contato(req.body)

    try {
        const contatos = await contato.findContatos()
        res.render('index', { contatos })

        
    } catch (error) {
        console.log(error)
        res.render('404')
    }

}



