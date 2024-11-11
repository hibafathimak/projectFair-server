const projects = require('../models/projectModel')

// addProject - authorisation needed

exports.addProjectController= async (req,res)=>{
    console.log("inside addProjectController");
    const userId=req.userId
    console.log(userId);
    const {title,languages,overview,github,website}=req.body
    const projectImg = req.file.filename
    console.log(title,languages,overview,github,website,projectImg);
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist in our collection ..Please upload another")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get homePageProject - no auth

exports.homePageProjectController=async(req,res)=>{
    console.log("Inside homePageProjectController");
    try {
        const allHomeProjects=await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.allProjectsController=async(req,res)=>{
    console.log("inside allProjectsController");
    const searchKey =req.query.search
    console.log(searchKey);
    const query={
        languages:{
            $regex:searchKey,
            $options:'i'
        }
    }
    try {
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// get userProject - auth

exports.userProjectsController=async(req,res)=>{
    console.log("inside UserProjectsController");
    const userId=req.userId
    try {
        const allUserProjects=await projects.find({userId})
        res.status(200).json(allUserProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit user project -auth
exports.editProjectController=async(req,res)=>{
    console.log("Inside editProjectController");
    const id =req.params.id
    const userId =req.userId
    const {title,languages,overview,github,website,projectImg}=req.body
    const reUploadProjectImg = req.file?req.file.filename:projectImg
    try {
        const updateProject =await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImg:reUploadProjectImg,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// DELETE User Project - auth 
exports.removeProjectController = async(req,res)=>{
    console.log("Inside removeProjectControllerr");
    const {id}=req.params
    try {
        const deletedProject = await projects.findOneAndDelete({_id:id})
        res.status(200).json(deletedProject)
    } catch (error) {
        res.status(401).json(error)
    }
}
