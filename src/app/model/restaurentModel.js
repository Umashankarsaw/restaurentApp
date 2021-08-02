const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const restaurent = new Schema({
    // _id:{type:String, required:true},
    name:{type:String, required:true},
    phone:{type:String, required:true},
    location:Object,
    address:Array,
    cuisine:Array,
    budget:Number,
    menus:{
        type:Schema.Types.ObjectId,
        ref:'menus'
    }
})

const address ={
    streetName:String,
    city:String,
    postCode:String

};

const location ={
    lat:String,
    long:String
}
restaurent.location=location;
restaurent.address = address;

module.exports = mongoose.model('restaurents',restaurent); 