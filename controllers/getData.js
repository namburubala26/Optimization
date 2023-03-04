const expenseApp = require('../models/data')

exports.getData = async (req,res)=>{
    try{
        const fullData = await expenseApp.findAll({where: {userId:req.user.id}})
        res.status(200).json({success:true,message:'fetched successfully',fullData:fullData})
    }
    catch(err){
        res.status(500).json({success:false,message:`failed at controllers/getData--> ${err}`})
    }
}