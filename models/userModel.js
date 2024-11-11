const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true // data will be only stored if this field is present
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    profilePic:{
        type:String,
    }
})

const users = mongoose.model("users",userSchema) //creating model for user collection using userSchema

module.exports = users