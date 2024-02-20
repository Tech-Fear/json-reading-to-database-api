const mongoose=require('mongoose')
const ItemSchema= mongoose.Schema(
    {
        Name:{
            type:String,
            required:[true,"Can't have item without name in Menu"]
        },
        Price:{
            type:Number,
            required:[true,"Item price is mandatory"]
        },
        Type:{
            type:String,
            required:[true,"Due to Persons Choice"]
        },
        Image:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
);
const Items=mongoose.model("Items",ItemSchema)
module.exports = Items;