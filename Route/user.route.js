const express=require("express")
const { register, login, getUser, getAllUsers } = require("../Controller/user.controller")
const { auth } = require("../Middleware/auth.middleware")
const user=express.Router()
user.post('/register',register)
user.post('/login',login)
user.get('/getuser',auth, getUser)
user.get('/allusers',getAllUsers)
module.exports={user}