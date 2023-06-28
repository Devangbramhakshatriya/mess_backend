const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
  adminName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const AdminModel = mongoose.model('admin', adminSchema)

module.exports = { AdminModel }