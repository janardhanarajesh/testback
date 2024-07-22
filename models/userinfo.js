import mongoose, { mongo } from "mongoose";
const newuser=mongoose.Schema;
let useinfo=new newuser({
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
phnumber:{
    type:String,
    required:true
}
})
export default mongoose.model("Mainuser",useinfo);