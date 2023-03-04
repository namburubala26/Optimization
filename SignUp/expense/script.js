// function btnClicked(e){
//     e.preventDefault()
//     async function postingData (){
//         try{
//             const fromData = await axios.post('http://localhost:3000/post',{
//                 expenseamount:document.getElementById('expenseamount').value,
//                 description:document.getElementById('description').value,
//                 category:document.getElementById('category').value
//         })
//         console.log(`logging here --> `,fromData.config.data)
//         showExpenseList(fromData.config.data)

//     }      
//         catch(err){
//             console.log(err)
//         }     
//     }
//     postingData()
// }

// function showExpenseList(data) {
//     console.log(data)
// 	// creating li to display on the UI
// 	const li = document.createElement("li")
//     const br = document.createElement("BR")
// 	li.id = `${data.id}`
// 	li.appendChild(document.createTextNode(`${data.expenseamount}- ${data.description}- ${data.category}    `))
// 	itemList.appendChild(li)
//     itemList.appendChild(br)
    

//     let delBtn = document.createElement("button")
// 	delBtn.id = "delete";
// 	delBtn.appendChild(document.createTextNode("delete"));
// 	delBtn.onclick = function () {
// 		deleteUser(data.id)
// 	};
// 	li.appendChild(delBtn)
// 	itemList.appendChild(li)

//     // creating edit button
// 	let editbtn = document.createElement("button");
// 	editbtn.id = "edit"
// 	editbtn.appendChild(document.createTextNode("edit"));
// 	editbtn.onclick = function () {
// 		editUser(data.expenseamount,data.description,data.category,data.id)
// 	};
// 	li.appendChild(editbtn)
//     itemList.appendChild(li)
// }

// async function deleteUser(userID) {
//     try{
//         await axios.delete(`http://localhost:3000/delData/${userID}`)
//         removeUser(userID)
//         }catch(err){
// 			console.log(err);
// 		};		
// }

// async function editUser(expenseamount,description,category,dataId){

//     try{
//         document.getElementById("expenseamount").value = expenseamount
// 	    document.getElementById("description").value = description
// 	    document.getElementById("category").value = category
//         await removeUser(dataId)
//         let btn = document.createElement("button")
//         btn.id='update'
//         btn.innerHTML = "Update Details"  
//         document.body.appendChild(btn)
//         await updateDetails(dataId)
        
//     }
//     catch(err){
//         console.log(err);
//     };	
// }

// async function updateDetails(dataId){
//     try{
//         console.log(`logging at update details --> ${dataId}`)
//         document.getElementById("update").addEventListener("click", updateFunc)
//         async function updateFunc() {
//         console.log('inside update func')   
        
//         await axios.put(
//             `http://localhost:3000/editData/${dataId}`,
//             {
//                 expenseamount:document.getElementById("expenseamount").value,
//                 description : document.getElementById("description").value,
//                 category : document.getElementById("category").value,
//             }
//         ) 
//           await document.getElementById("update").remove()
//           location.reload()
//     }
          
        
//     }
//     catch(err){
//         console.log(err)
//     }
// }

// function removeUser(userID) {
// 	let ul = document.getElementById("itemList");
// 	let li = document.getElementById(userID);
// 	return ul.removeChild(li);
// }

// window.addEventListener("DOMContentLoaded", async function(){
//     try{
//         const onDomLoad = await axios.get("http://localhost:3000/getData")
//         console.log(onDomLoad.data.fullData)
//         data = onDomLoad.data.fullData
//         for (let i = 0; i < data.length; i++) {
//             showExpenseList(data[i]);
//     }
//     }catch(err){
//         console.log(err);
//     }
// })
function btnClicked(e){
    e.preventDefault()
    const expenseDetails = {
        expenseamount : e.target.expenseamount.value,
        description : e.target.description.value,
        category : e.target.category.value,
        userId:1
    }
    console.log(expenseDetails);
    axios.post('http://localhost:3000/expense/addexpense',expenseDetails)
        .then((response) => {
            // if(response.status === 201){
                addNewExpensetoUI(response.data.expense);
            // } else {
            //     throw new Error('Failed to create new expense');
            // }
        })
        .catch(err => showError(err))
}
window.addEventListener('DOMContentLoaded',() => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3000/expense/getexpenses', expenseDetails, {headers: {"Authorization" : token}})
        .then(response => {
            response.data.expenses.forEach(expense => {
                addNewExpensetoUI(expense);
            })
            .catch(err => {
                showError(err)
            })
        })
})
function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('itemList');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `<li id=${expenseElemId}>
                                    ${expense.expenseamount} - ${expense.category} - ${expense.description}
                                    <button onclick='deleteExpense(event,${expense.id})'>
                                        Delete Expense
                                    </button>
                                </li>        `
}
function deleteExpense(e,expenseid) {
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/delete/${expenseid}`,  {headers: {"Authorization" : token}})
        .then(() => {
            removeExpensefromUI(expenseid);
        })
        .catch((err => {
            showError(err);
        }))
}
// function removeExpensefromUI(expenseid) {
// 	// let ul = document.getElementById("itemList");
// 	// let li = document.getElementById(userID);
// 	// return ul.removeChild(li);
//     const expenseElemId = `expense-${expenseid}`;
//     document.getElementById(expenseElemId).remove();
// }

function showPremiumMessage() {
    document.getElementById('rzp-button1').style.visibility = "hidden"
        document.getElementById('message').innerHTML = "You are a Premium User"
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.getElementById('rzp-button1').onclick = async function(e) {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
    const ispremiumuser = decodeToken.ispremiumuser
    if(!isadmin){
        showPremiumMessage()
    }
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', {headers: {"Authorization" : token}})
    console.log(response);
    var options =
    {
        "key": response.data.key_id,
        "order_id": response.data.order_id,
        "handler":async function (response) {
            await axios.post('http://localhost:3000/purchase/updatetranscationstatus', {
                order_id : options.order_id,
                payment_id : response.rozorpay_payment_id,
        }, {headers: {"Authorization":token}})
        alert('You are a Premium User now')
        
        localStorage.getItem('isadmin',true)
        },
    };
    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on('payment.failed', function (response) {
        console.log(response);
        alert('Something went wrong')
    })
}