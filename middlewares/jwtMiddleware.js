const jwt =  require('jsonwebtoken')

//creating middleware for authorisation

const jwtMiddleware=(req,res,next)=>{
console.log("inside jwtMiddleware");
const token = req.headers["authorization"].split(" ")[1] // getting token from request header and removing bearer using split
console.log(token);
if(token){
    // verifying token
    try {
        const jwtResponse= jwt.verify(token,process.env.JWTPASSWORD)
        console.log(jwtResponse);
        req.userId=jwtResponse.userId
        next() // will give proceed to resolve the request
        
    } catch (error) {
        res.status(401).json("Authorization failed ... Token is Missiing")
    }

}else{
    res.status(404).json("Authorization failed ... Token is Missiing")
}


}

module.exports =jwtMiddleware