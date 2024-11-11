const users = require('../models/userModel')
const jwt =  require('jsonwebtoken')

//register 

exports.registerController =async (req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body); 
    const {username,email,password} =req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exist .. Please Login!!")
        }else{
            const newUser=new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//login 

exports.loginController=async(req,res)=>{
    console.log("Inside loginController");
    const {email,password}=req.body
    console.log(email,password);
    try {
        const existingUser =await users.findOne({email,password})
        if(existingUser){
            //token generation for authorising user 
            const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("Incorrect Email or Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}


//profile updation


exports.editUserController=async(req,res)=>{
    console.log("inside editUserController");
    
    const {username,email,password,github,linkedin,profilePic}=req.body
    const uploadedProfilePic = req.file?req.file.filename:profilePic
    const userId=req.userId
    console.log(username,email,password,linkedin,uploadedProfilePic,userId);
    try{
        console.log("Inside try");
        
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadedProfilePic
        },{new:true})
        console.log(updatedUser);
        
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(401).json(error)
    }
}