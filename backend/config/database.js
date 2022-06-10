require('dotenv').config()
const {Sequelize}=require('sequelize')

const sequelize=new Sequelize(process.env.SQL_DBNAME,process.env.SQL_USERNAME,String(process.env.SQL_PASSWORD),{
    host:'localhost',
    dialect:'postgres',
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