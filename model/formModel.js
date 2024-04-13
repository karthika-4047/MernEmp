const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    Name:String,
    Designation:String,
    Location:String,
    Salary:Number
});

const formModel = mongoose.model('form',Schema);
module.exports = formModel;