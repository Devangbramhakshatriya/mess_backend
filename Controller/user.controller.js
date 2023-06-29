const UserModel = require("../Model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { auth } = require("../Middleware/auth.middleware")
const register = async (req, res) => {
    try {
        let user = req.body
        let existUser = await UserModel.find({ mobileNumber: user.mobileNumber })
        if (existUser.length) {
            return res.status(201).send({ msg: "User already exist, please login" })
        }
        bcrypt.hash(user.password, 5, async (err, hash) => {
            user.password = hash
            let userRegister = new UserModel(user)
            await userRegister.save()
            res.status(200).send({ msg: "User Has Been Registerd" })
        })
    } catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

const login = async (req, res) => {
    try {
        let credentials = req.body
        let user = await UserModel.findOne({ mobileNumber: credentials.mobileNumber })

        if (!user) {
            return res.status(400).send({ msg: "User Not Found" })
        }

        bcrypt.compare(
            credentials.password,
            user.password,
            function (err, result) {
                if (result) {
                    let token = jwt.sign(
                        { userId: user._id },
                        "dev"
                    )
                    res.status(200).send({ msg: "Login Success", token: token })
                } else {
                    res.status(400).send({ msg: "Login Failed" })
                }
            }
        )
    } catch (err) {
        res.status(400).send({ msg: err.message })
    }
}


const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.body.userId })
        res.status(200).send({ user })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const user = await UserModel.findOne({ _id: id })
        res.status(200).send({ user })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const updateUser=async (req,res)=>{
    const { id } = req.params
    const payload=req.body
    try {
        const user = await UserModel.findByIdAndUpdate({ _id: id },payload)
        res.status(200).send({ msg:"user Updated" })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).send({ users })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}
module.exports = { register, login, getUser, getAllUsers, getSingleUser, updateUser}