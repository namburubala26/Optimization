// const express = require('express')
// const expenseApp = require('./models/data')
// const app = express()
// const sequelize = require('./util/dataBase')

// const cors = require('cors')
// const bodyParser = require('body-parser')

// const postRoute = require('./router/data')
// const getRoute = require('./router/getData')
// const delRoute = require('./router/delData')
// const editRoute = require('./router/editData')

// app.use(cors())
// app.use(bodyParser.json({extended:false}))

// app.use(postRoute)
// app.use(getRoute)
// app.use(delRoute)
// app.use(editRoute)

// async function sequelInstance(){
//     await sequelize.sync()
//     console.log("The table for the sequelize model was just created!")
//     app.listen(3000, ()=>{
//         console.log('port running on 3000')
//     })
// }
// sequelInstance()

// // sequelize.sync()
// // .then((result)=>{
// //     app.listen(8000)
// // })
// // .catch((err)=>{
// //     console.log(err)
// // })
const path = require('path');

const express = require('express');
var cors = require('cors')
const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeature')

const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();


app.use(cors());

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })