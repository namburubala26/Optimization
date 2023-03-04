const expenseApp = require('../models/data')

exports.postData = async (req,res)=>{
    try{
        const {expenseamount,description,category} = req.body
        if(expenseamount == undefined || expenseamount.length === 0){
            return res.status(400).json({success:false,message:'parameters missing'})
        }
        // req.user.createExpense
        await expenseApp.create({expenseamount,description,category,userId: req.user.id})
        res.status(201).json({success:true,message:'successful'})
    }
    catch(err){
        res.status(500).json({success:false,message:`failed here--> ${err}`})
    } 
}