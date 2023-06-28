const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    date:String,
    time:String,
    quantity:Number,
    total:Number,
    userId:String
})

const orderModel=mongoose.model('order',orderSchema)

module.exports={orderModel}