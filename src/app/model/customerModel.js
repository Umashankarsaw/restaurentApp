const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema= new Schema({
  _id:{type:String, required:true},
  name:{type:String, required:true},
  email:{type:String, required:true, unique : true} ,
  password:{type:String, required:true },
  address:{type:Array, required:true}
});


let Address={
    streetName:{type:String, require:true},
    city:{type:String, require:true},
    pincode:{type:String, require:true}
}

customerSchema.address=Address;

module.exports = mongoose.model("customers",customerSchema);