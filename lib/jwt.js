const jwt = require('jsonwebtoken')
const SECRET_KEY = "246357cn"

async function sign(obj){
    const token = await jwt.sign(obj, SECRET_KEY, {expiresIn: 60 /*60s*/})
    return token;
}

async function verify(token){
    // jwt.verify(token,SECRET_KEY, (err, decoded)=>{
    //     if(err) return err;
    //     return decoded;
    // })
    const  decoded = jwt.verify(token,SECRET_KEY)
    return decoded;
}

module.exports = {sign, verify}