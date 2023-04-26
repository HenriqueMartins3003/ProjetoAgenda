const mongoose = require('mongoose')
const validator = require ('validator')

const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now}
})

const ContatoModel = mongoose.model('contato',contatoSchema)

class Contato {
    constructor(body){
        this.body = body
        this.errors = []
        this.contato = null
    }

    async register(){
        this.validaForm()
        if(this.errors.length > 0 ){ return } 

        this.contato = await ContatoModel.create(this.body)
    }

    async getContato(id){
        if(typeof id !== 'string') return 

        const user = await ContatoModel.findById(id)
        return user
    }

    async edit(id){
        if(typeof id !== 'string') return 
        this.validaForm()
        if(this.errors.length > 0 ){ return } 

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})

    }

    async findContatos(){
        const contatos = await ContatoModel.find().sort({ criadoEm: -1})

        return contatos
    }

    async deleteContato(id){
        if(typeof id !== 'string') return 

        this.contato = await ContatoModel.findOneAndDelete({_id: id})

        return this.contato
    }

    validaForm(){
        //limpando meu objeto para ele ter apenas os campos necessarios.
        this.cleanUp()

        //Validação
        //Nome precisa ser preenchido.
        if(this.body.nome.length <= 2 && !this.body.nome) {
            this.errors.push('Nome precisa ser preenchido')
        }
       
        //Email precisa ser valido
        if(this.body.email && !validator.isEmail(this.body.email)){
            this.errors.push('Email inválido')   
        }

        //Telefone precisa ser valido
        if(!this.body.telefone && !this.validatePhoneNumber(this.body.telefone)) {
            this.errors.push('Número de telefone inválido')
        }

        if(!this.body.telefone && !this.body.email){
            this.errors.push('Cadastre um Email ou telefone')
        }
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email,
            
        }
    }

     validatePhoneNumber(phoneNumber) {
        // Remova todos os caracteres que não são números
        var cleaned = phoneNumber.replace(/\D/g, '');
        
        // Verifique se o número tem 8 dígitos para residencial
        if(cleaned.length === 8) { return true }
        
        // Verifique se o número tem 9 dígitos para celular
        if(cleaned.length === 9) { return true }
        
        // Verifique se o número tem 11 dígitos e começa com "9" (para números de celular) com o DDD
        if(cleaned.length === 11 && cleaned.charAt(2) === '9') { return true; }
        
        // Caso contrário, o número é inválido
        return false;
      }
      
}

module.exports = Contato
