const express=require('express')
const { connection } = require('./db')
const cors=require('cors')
const { user } = require('./Route/user.route')
const { order } = require('./Route/order.route')
const { admin } = require('./Route/admin.route')
const app=express()
app.use(express.json())
app.use(cors())
app.use('/users',user)
app.use('/admins',admin)
app.use('/orders',order)
app.listen(4500,async()=>{
    try{
        await connection
        console.log("Connected To DB")
    }catch(err){
        console.log(err)
    }
    console.log("Server Is Running On Port 4500")
    // console.log(new Date().toISOString().slice(0, 10))
    console.log(new Date().toTimeString().split(" ")[0])
})