const { orderModel } = require("../Model/order.model")
const UserModel = require("../Model/user")

const addOder = async (req, res) => {
    const payload = req.body
    try {
        const order = new orderModel(payload)
        await order.save()
        res.status(200).send({ msg: "Order Placed Successfully" })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getOrder = async (req, res) => {
    let { filter } = req.query
    let obj = {
        userId: req.body.userId
    }
    if (filter) {
        obj.date = filter
    }
    console.log(obj.date)
    try {
        const order = await orderModel.find({ date: { $regex: obj.date }, userId: obj.userId })
        res.status(200).send({ order })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}



const userOrder = async (req, res) => {
    const { id } = req.params
    let { filter } = req.query
    let obj = {}
    if (filter) {
        obj.date = filter
    }
    console.log(id)
    try {
        const order = await orderModel.find({ date: { $regex: obj.date }, userId: id })
        res.status(200).send(order)
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}
const getSingleOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await orderModel.findOne({ _id: id })
        res.status(200).send({ order })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getTodaysOrder = async (req, res) => {
    const todays = new Date
    let d = todays.toISOString().split('T')[0]
    console.log(d)
    try {
        const order = await orderModel.find({ date: { $eq: d } }).populate('userId')
        const userOrdersMap = new Map();

        order.forEach((order) => {
            const userId = order.userId;
            const userOrders = userOrdersMap.get(userId) || [];
            userOrders.push(order);
            userOrdersMap.set(userId, userOrders);
        });

        const orderDetails = [];

        for (const [userId, userOrders] of userOrdersMap.entries()) {
            // Retrieve user details based on the userId
            const user = await UserModel.findById(userId); // Assuming you have a User model

            orderDetails.push({
                user,
                orders: userOrders,
            });
        }


        res.status(200).send(orderDetails)
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getTomorrowsOrder = async (req, res) => {
    var currentDate = new Date()
    var day = currentDate.getDate()+1
    var month = currentDate.getMonth() + 1
    if(month<10){
        month=`${0}${month}`
    }
    var year = currentDate.getFullYear()
    let date = `${year}-${month}-${day}`
    console.log(date)
    try {
        const order = await orderModel.find({ date: { $gte: date } }).populate('userId')
        const userOrdersMap = new Map();

        order.forEach((order) => {
            const userId = order.userId;
            const userOrders = userOrdersMap.get(userId) || [];
            userOrders.push(order);
            userOrdersMap.set(userId, userOrders);
        });

        const orderDetails = [];

        for (const [userId, userOrders] of userOrdersMap.entries()) {
            // Retrieve user details based on the userId
            const user = await UserModel.findById(userId); // Assuming you have a User model

            orderDetails.push({
                user,
                orders: userOrders,
            });
        }


        res.status(200).send(orderDetails)
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getYesterdaysOrder = async (req, res) => {
    var currentDate = new Date()
    var day = currentDate.getDate()-1
    var month = currentDate.getMonth() + 1
    if(month<10){
        month=`${0}${month}`
    }
    var year = currentDate.getFullYear()
    let date = `${year}-${month}-${day}`
    console.log(date)
    try {
        const order = await orderModel.find({ date: { $eq: date } }).populate('userId')
        const userOrdersMap = new Map();

        order.forEach((order) => {
            const userId = order.userId;
            const userOrders = userOrdersMap.get(userId) || [];
            userOrders.push(order);
            userOrdersMap.set(userId, userOrders);
        });

        const orderDetails = [];

        for (const [userId, userOrders] of userOrdersMap.entries()) {
            // Retrieve user details based on the userId
            const user = await UserModel.findById(userId); // Assuming you have a User model

            orderDetails.push({
                user,
                orders: userOrders,
            });
        }


        res.status(200).send(orderDetails)
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const deleteOrder = async (req, res) => {
    const { orderId } = req.params

    try {
        await orderModel.findByIdAndDelete({ _id: orderId }, { userId: req.body.urserId })
        res.status(200).send({ msg: "Order Has been Deleted" })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

module.exports = { addOder, getOrder, deleteOrder, getSingleOrder, userOrder, getTodaysOrder, getTomorrowsOrder, getYesterdaysOrder}