//handling multipart / form data using multer
const multer =require('multer')
//multer can be used to define storage space for the uploaded file
//define multer storage using diskStorage

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")  // destination to which files are stored is specified
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`) // creating names for files uploaded
    }
})

const multerMiddleware = multer({
    storage
})
//returns multer instance that add body (text field values) and file/files (files) objects inside req body

module.exports = multerMiddleware