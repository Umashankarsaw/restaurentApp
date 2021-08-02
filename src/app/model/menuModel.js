const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let menuSchema= new Schema({
  _id:{type:String, required:true},
  name:{type:String, required:true},
  price:{type:Number, required:true}
  
});
module.exports = mongoose.model("menus",menuSchema);