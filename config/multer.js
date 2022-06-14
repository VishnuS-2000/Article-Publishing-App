const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")
    },filename:(req,file,cb)=>{
        var fileType=''
        if(file.mimetype=='image/png'){
            fileType='png'
        }
        if(file.mimetype=='image/jpeg'){
            fileType='jpeg'
            
        }
        if(file.mimetype=='image/jpg'){
            fileType='jpg'
        }

        cb(null,'image-'+Date.now()+'.'+fileType)
    }
});

module.exports.upload=multer({storage:storage})