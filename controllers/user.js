const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true
    } else {
        return false
    }
}
const signup = async (req,res) => {
    try{
    const {name, phno, email, password} = req.body;
    if(isstringinvalid(phno) || isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({err:'Bad Parameters. Something is missing'})
    }
    bcrypt.hash(password,10,async (err,hash) => {
        console.log(err);
        await User.create({name,phno,email,password:hash})
        res.status(201).json({message:'Successfuly create new user'})
    })
    }catch(err)  {
            res.status(500).json(err);
        }
}

function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id , name:name , ispremiumuser} , 'secretkey')
}

const login = async (req,res) => {
    try{
    const { email, password } = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({success:false, message:"Email id or password is missing"})
    }
    console.log(password);
    const user = await User.findAll({where: { email }})
        if(user.length > 0){
            bcrypt.compare(password,user[0].password, (err,result) => {
                if(err){
                    throw new Error('Something went wrong');
                }
                if(result === true){
                    return res.status(200).json({success:true, message:"User logged in successfully", token: generateAccessToken(user[0].id , user[0].name , user[0].ispremiumuser)})
                } else {
                    return res.status(400).json({success:false, message:"Password is incorrect"})
                }
            }) 
        } else {
            res.status(404).json({success:false, message:"User Doesnot exist"})
        }
    } catch(err){
        res.status(500).json({message:err,success:false})
    }
}