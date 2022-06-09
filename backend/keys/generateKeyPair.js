const crypto=require('crypto')
const fs=require('fs')


function generateKeyPair(){

    const keyPair=crypto.generateKeyPairSync('rsa',{
        modulusLength:4096,
        publicKeyEncoding:{
            type:'pkcs1',
            format:'pem'

        },
        privateKeyEncoding:{
            type:'pkcs1',
            format:'pem'

        }    })

        fs.writeFileSync(__dirname+"/privateKey.pem",keyPair.privateKey)
        fs.writeFileSync(__dirname+"/publicKey.pem",keyPair.publicKey)

}

generateKeyPair()


