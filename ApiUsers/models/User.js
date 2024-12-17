const knex = require("../database/connection")
const bcrypt = require("bcrypt")
const PasswordToken = require("./PasswordToken")

//Nome alternativo pra Model no knex é Service
class User{
    async new(name,email,password){
        try{
            const hashPassword = await bcrypt.hash(password, 10)
            await knex.insert({name,email,password: hashPassword, role: 0}).table("users")
        }catch(error){
            console.log(error)
        }
        
    }

    async findEmail(email){
        try{
            const result = await knex.select("*").from("users").where({email: email})
             if(result.length > 0){
                return true;
             }else{
                return false;
             }
        }catch(error){
            console.log(error)
            return false
        }
    }
    async findAll(){
        try{
            const Users = await knex.select(["id","email", "role","name"]).from("users")
            return Users
        }catch(error){
            console.log(error)
        }
    }

    async idExists(id){
        try{
            const User = await knex.select("*").from("users").where({id: id})
            if(User.length > 0){
                return true
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return false
        }
    }
    async findbyPk(id){
        try{
            const User = await knex.select(["id", "name", "email"]).from("users").where({id: id})
            if(User.length > 0){
                return User[0]
            }else{
                return undefined
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async update(id,name,email,role){
        try{
            const user = await this.findbyPk(id)
            if(user != undefined){
                const editUser = {}

                if(email != undefined){
                    if(email != user.email){
                        const result = await this.findEmail(email)
                        if(result == false){
                            editUser.email = email
                        }else {
                            return {status: false, err: "O e-mail já existe!"}   
                        }
                    } else{
                        return {status: false, err: "O e-mail informado já está associado a este usuário."}  
                    }
                }

                if(name != undefined){
                    editUser.name = name
                }
                if(role != undefined){
                    
                    editUser.role = role
                }
                await knex("users").update(editUser).where({ id });
                return {status: true}

                
            }else{
                return {status: false, err: "O usuario nao existe!"}
            }
        }catch(error){
            console.log(error)
        }
    }

    async delete(id){
        const user = await this.findbyPk(id)
        if(user != undefined){
            await knex('users').where({id: id}).del()
            return {status: true}
        }else{
            return {status: false, err: "o usuario nao existe"}
        }
        
    }

    async findbyEmail(email){
        try{
            const User = await knex.select(["id", "name", "email", "password", "role"]).from("users").where({email: email})
            if(User.length > 0){
                return User[0]
            }else{
                return undefined
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async changePassword(newPassword,id,token){
        const hashPassword = await bcrypt.hash(newPassword, 10)
        await knex("users").update({password: hashPassword}).where({id: id})
        await PasswordToken.setUsed(token)
    }
}

module.exports = new User()