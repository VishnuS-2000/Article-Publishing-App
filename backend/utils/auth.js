const crypto=require('crypto')
const jwt=require('jsonwebtoken')
const fs=require('fs')

const PRIVATE_KEY=fs.readFileSync(__dirname+"/../keys/privateKey.pem")

function genPassword(password){
    var salt=crypto.randomBytes(32).toString('hex')
    const genHash=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return {
        salt:salt,
        hash:genHash
    }
}


const validatePassword=(password,hash,salt)=>{
    const hashedPassword=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return hashedPassword===hash

}


function issueJWT(admin){

 
    const username=admin.username;
    console.log(username)
    const expiresIn='2w'
    const payload={
        sub:username,
        iat:Date.now()
    }

    
const signedToken=jwt.sign(payload,PRIVATE_KEY,{expiresIn:expiresIn,algorithm:'RS256'})

return {
    token:"Bearer "+signedToken,
    expires:expiresIn
}


}




module.exports.genPassword=genPassword
module.exports.issueJWT=issueJWT
module.exports.validatePassword=validatePassword