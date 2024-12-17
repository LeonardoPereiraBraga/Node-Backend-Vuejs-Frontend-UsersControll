const User = require("../models/User")
const PasswordToken = require("../models/PasswordToken")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const secret = "hfjcnvruehjvguerhjfugve"

class UserController{
    async index(req,res){

    }
    async create(req,res){
        const {name,email, password} = req.body
        if(email == undefined || email == ""){
            res.status(400)
            res.json({err: "O  e-mail é invalido"})
            return
        }else{
            const emailExists = await User.findEmail(email)
            if(emailExists){
                res.status(406)
                res.json({err: "O e-mail já esta cadastrado"})
                return
            }
            
            //O metodo importado é assincrono entao tem que ter await
            await User.new(name,email,password)
        res.status(200)
        res.send("Pegando o corpo da requisiçao")
        }
    }
    async findUsers(req,res){
        res.status(200)
        const Users = await User.findAll()
        
        res.json(Users)
    }

    async update(req,res){
        var {id, name, role, email} = req.body;
        var result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }
    async delete(req,res){
        const id = req.params.id
        const userExists = await User.idExists(id)
        if(userExists){
            User.delete(id)
            res.status(200)
            res.json("Usuario Deletado!")
            
        }else{
            res.status(404)
            res.json("Usuario nao encontrado!")
        }
    }

    async findOneUser(req,res){
        const id = req.params.id
        const user = await User.findbyPk(id)
        if(user == undefined){
            res.status(404)
            res.json({})
        }else{
            res.status(200)
            res.json(user)

        }
    }

    async recoverPassword(req,res){
        const email = req.body.email
        const result = await PasswordToken.create(email)
        if(result.status){
            res.status(200)
            res.send(result.token + " ")
        }else{
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req,res){
        const token = req.body.token
        const password = req.body.password

        const isTokenValid = await PasswordToken.validate(token)
        if(isTokenValid.status){
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.send("Senha alterada")
        }else{
            res.status(406)
            res.send("Token Invalido")
        }
    }

    async login(req,res){
        const {email,password} = req.body

        const user = await User.findbyEmail(email)

        if(user != undefined){
           const result = await bcrypt.compare(password, user.password)
           if(result){
            const token = jwt.sign({ email: user.email, role: user.role}, secret);

            res.status(200)
            res.json({token: token})
           }else {
            res.status(406)
            res.json({err: "Senha incorreta"})
           }
        }else {
            res.status(406)
            res.json({status: false, err: "Usuario nao existe"})

        }
    }



}

module.exports = new UserController()