const {DataTypes,Model} =require('sequelize')
const {sequelize}=require('../config/database')

class Author extends Model{}


Author.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    designation:{
        type:DataTypes.STRING
    },
    articlesPublished:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    details:{
        type:DataTypes.STRING
    },
    photo:{
           type:DataTypes.STRING
    }

},{
    sequelize,
    modelName:'author'
})


const syncModel=async()=>{
    try{
        await Author.sync()
    }
    catch(err){
        console.log(err)
    }
}

syncModel()

module.exports.Author=Author;