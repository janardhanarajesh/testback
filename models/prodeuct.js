import mongoose, { mongo } from "mongoose";
const nwpr=mongoose.Schema;
let product=new nwpr({
    item:{
        type:String,
        required:true
    },
    disc:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    }
})
export default mongoose.model("Pro",product)