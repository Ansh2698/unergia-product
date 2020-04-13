var mongoose=require("mongoose");
var ProductSchema=mongoose.Schema({
    Name:{type:String,unique:true},
    ProductImage:{data: Buffer, contentType: String},
    Description:{type:String,default:""},
    Price:{type:Number,default:0}
});
module.exports=mongoose.model("Product",ProductSchema);