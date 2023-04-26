import validator from "validator"

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) { return }
        
        this.form.addEventListener('submit', (e)=> {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        const el = e.target
        const emailImput = el.querySelector('input[name="mail"]')
        const passwordImput = el.querySelector('input[name="password"]')

        let error = false

        if(!validator.isEmail(emailImput.value)){ 
            alert('Email inválido')
            error = true
        }

        if(passwordImput.value.length < 3 || passwordImput.value.length > 30){ 
            alert('Senha precisa ter entre 3 e 20 caracteres')
            error = true
        }

        if(!error) { el.submit()}

        //console.log(emailImput.value, passwordImput.value)
    }


}