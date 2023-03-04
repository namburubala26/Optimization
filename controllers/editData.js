const expenseApp = require('../models/data')

exports.editData = async(req,res)=>{
    try{
        const dId = req.params.id
        console.log(`logging at edit controllers --> ${dId}`)
        await expenseApp.update(
            {
                expenseamount :req.body.expenseamount,
                description : req.body.description,
                category: req.body.category
            },
            {where:{id:dId}}
        )
        res.status(200).json({success:true,message:'succesfull'})
    }
    catch(err){
        console.log('unable to edit')
        res.status(500).json({success:false,message:`failed at controller/editData-->${err}`})
    }
}