//require modules
const mysql=require("mysql");
const bcrypt=require("bcryptjs");

//create connection with mysql
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});


exports.register=(req,res)=>{
    console.log(req.body);
     
    const{name,email,password,passwordConfirm}=req.body;

    db.query('SELECT * FROM `nodejs-login`.users WHERE email=?',[email],async (error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return res.render('register',{
                message:"That email is already in use"
            })
        } else if(password !==passwordConfirm){
            return res.render('register',{
                message:"Passwords do not match"
            });
        }

       let hashedPassword=await bcrypt.hash(password, 8);
       console.log(hashedPassword);
      //write query to insert user data into our database    
      db.query('INSERT INTO `nodejs-login`.users SET ?',{name:name, email:email, password:hashedPassword},(error,results)=>{
           if(error){
               console.log(error);
           }else{
               console.log(results);
            return res.render('register',{
                message:"user registered"
            });
           }
      })
    });
}
