const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://devangbramhakshatriya:devang@cluster0.70nniw5.mongodb.net/mess?retryWrites=true&w=majority')

module.exports = { connection }