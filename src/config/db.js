const { connect } = require("mongoose");

const mongoose = require('mongoose');
const {MONGODBSTRING} = require('./config');
const connectDB= async()=>{
    await mongoose.connect(MONGODBSTRING, 
        {
            useUnifiedTopology:true,
            useNewUrlParser:true
        })

        console.log("Db connected")
}


module.exports = connectDB;