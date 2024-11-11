const mangoose = require('mongoose') // importing mangoose for connecting

const connectionString=process.env.DBCONNECTIONSTRING // getting connection string from process variable

mangoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Connected successfully with pfServer");
}).catch(err=>{
    console.log("MongoDB Atlas Connection Failed");
    console.log(err);
}) // connect(connection_string) used to connect to mongodb