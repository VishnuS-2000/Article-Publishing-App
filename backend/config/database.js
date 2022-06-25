require('dotenv').config()
const {Sequelize}=require('sequelize')

const sequelize=new Sequelize(process.env.SQL_DBNAME,process.env.SQL_USERNAME,process.env.SQL_PASSWORD,{
    "dialect": "postgres",
    // "dialectOptions": {
    //     "ssl": {
    //         "require": true,
    //         "rejectUnauthorized": false
    //     },
        
    // },
    logging:false
})


const checkConnecion=async()=>{
    try{
        await sequelize.authenticate()
        console.log("Connection Established Successfully")
        }
        catch(err){
            console.log(err.message)
        }
}

checkConnecion()

module.exports.sequelize=sequelize;