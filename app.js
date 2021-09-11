//require modules
const express=require("express");
const path=require("path");
const mysql=require("mysql");
const dotenv=require('dotenv');

//require modules properties
dotenv.config({path: './.env'});
const app=express();

//create connection with mysql
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

//provide style.css path
const publicDirectory=path.join(__dirname, "/public");
app.use(express.static(publicDirectory));


//parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

//parse JSON bodies (as sent by API clients)
app.use(express.json());

//set handlebar template engine
app.set('view engine', 'hbs'); 

//connect with database
db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("mysql is connected!");
    }
});

//define routes
app.use('/',require("./routes/pages"));
app.use("/auth",require("./routes/auth"));

//set port number
const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log("server is connected!",port);
});