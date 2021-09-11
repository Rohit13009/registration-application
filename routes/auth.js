//require modules
const express=require('express');
const authController=require("../controllers/auth");

//require router properties
const router=express.Router();

router.post("/register",authController.register);

//export router module
module.exports=router;