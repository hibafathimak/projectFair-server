// steps to define express server 
require('dotenv').config() // Loads .env file contents into process.env
const express = require('express')
const cors = require('cors')
const router=require('./routes/router')
require('./database/dbConnection')

const pfServer = express() // create express server


pfServer.use(cors()) // enabling cors for data sharing
pfServer.use(express.json()) // parse json data from client //middleware
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT // creating port for server if its not available process.env.port will choose any available port number

pfServer.listen(PORT,()=>{
    console.log(`pfServer started at port ${PORT} and waiting for client request !!!`);
}) // running server in the given port 

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:blue">pfServer started at port and waiting for client request !!!<h1/>`)
})  // resolving get request at base url ('/') // setting status as success (200) // .send() used to display response in browser 

