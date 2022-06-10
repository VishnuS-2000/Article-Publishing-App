const {DataTypes,Model, STRING} =require('sequelize')
const {sequelize}=require('../config/database')

const {Author}=require('./author')

class Article extends Model{}

Article.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    subtitle:{
        type:DataTypes.STRING
    },
    content:{
        type:DataTypes.TEXT
    },
    references:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    },
     outline:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    },
    image:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    }
    
},{
    sequelize,
    modelName:'article'
})
Author.hasMany(Article,{
    foreignKey:'authorId',
    onDelete:'CASCADE'
})
Article.belongsTo(Author)

const syncModel=async()=>{
try{
    await Article.sync()
}
catch(err){
console.log(err)
}

}

syncModel()

module.exports.Article=Article