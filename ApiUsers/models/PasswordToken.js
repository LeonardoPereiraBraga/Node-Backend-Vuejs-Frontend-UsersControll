const Knex = require("knex")
const knex = require("../database/connection")
const User = require("./User")

class PasswordToken{

    async create(email){
       const user = await User.findbyEmail(email) 
       if(user != undefined){
        try{
            const token = Date.now()
            await knex("passwordtokens").insert({
                token: token,
                user_id: user.id,
                used: 0
                
            })
            return {status: true, token: token}

        }catch(error){
            console.log(error)
            return {status: false, err: error}

        }
        
        
       }else{
        return {status: false, err: "o e-mail informado nao existe"}
       }
    }

    async validate(token){
        try{
            const result = await knex.select("*").where({token:token}).table("passwordtokens")
            if(result.length > 0){
                const tk = result[0]

                if(tk.used){
                    return {status: false}
                }else{
                    return {status: true, token: tk}
                }
            }else{
                return {status: false}
            }
        }catch(error){
            console.log(error)
            return false;
        }
        
    }

    async setUsed(token){
        const numberToken = Number(token)
        await knex.update({used: 1}).where({token: numberToken}).table("passwordtokens")
    }

}

module.exports = new PasswordToken()