const {DataTypes,Model}=require('sequelize')
const {sequelize}=require('../config/database')

class Admin extends Model {}

Admin.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    salt:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{sequelize,modelName:'admin'})

const syncModel=async()=>{
    
    try{

    await Admin.sync()
}
catch(err){
    console.log(err)
}

}

syncModel() 

module.exports.Admin=Admin;
