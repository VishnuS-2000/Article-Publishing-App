const {DataTypes,Model} =require('sequelize')
const {sequelize}=require('../config/database')


class Token extends Model{}

Token.init({
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    sequelize,
    modelName:'token'
})

const syncModel=async()=>{
    try{
        await Token.sync()
    }
    catch(err){
        console.log(err)
    }
}

syncModel()

module.exports.Token=Token;



