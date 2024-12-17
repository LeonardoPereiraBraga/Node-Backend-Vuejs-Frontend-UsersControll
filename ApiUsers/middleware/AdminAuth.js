const jwt = require("jsonwebtoken")
const secret = "hfjcnvruehjvguerhjfugve"

module.exports = function(req,res,next){
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(" ")
        const token = bearer[1]

        const decoded = jwt.verify(token,secret)
        console.log(decoded)

        if(decoded.role == 1){
            next()
        }else{
            res.status(403)
            res.send("Voce nao tem permissao para isso")
            return
        }

        
        
    }else{
        res.status(403)
        res.send("Voce nao está autenticado")
        return
    }
}