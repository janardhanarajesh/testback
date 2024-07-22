import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose"; 
import cors from "cors"
import Mainuser from "./models/userinfo.js"
import nodemailer from "nodemailer"
import multer from "multer";
import Pro from "./models/prodeuct.js"
import Order from "./models/order.js";
import order from "./models/order.js";
//janardhana rajesh 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect("mongodb+srv://janardhanarajesh2:DFHdDIYYMI5l9fjR@cluster0.gxanxvl.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(2000))
.then(()=>console.log("connected to database and listening to port 2000"))
app.use("/api", (req, res, next)=>{ 
  res.send("working")
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
app.get("/getuser/:name/:phn/:mail",async(req,res,next)=>{
const name=req.params.name;
const number=req.params.phn;
const mal=req.params.mail
try{
  let user=await Mainuser.find({username:name,phnumber:number});
  if(user.length==0)
  {
// return res.status(200).json({msg:"no"});

          var transpo = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'scriptingcoder25@gmail.com',
              pass: 'dzns vyoi lqak yddb'
            }
          });
          
          var mailOpti = {
            from: 'scripringcoder25@gmail.com',
            to:mal,
            subject: 'sign up to order',
            html:"mr/mrs "+" "+name+" "+"your registration is successful "+" "+"<b>enjoy your shopping</b>.",
          }
          
          transpo.sendMail(mailOpti, function(error, info){
            if (error) {
              console.log(error);
            } else {
            //   console.log('Email sent: ' + info.response);
              return res.status(242).json({msg:'no'})
            }
              });
              
  }
  else{
return res.status(200).json({msg:"yes"});

  }
}
catch(err)
{
console.log("error")
}
})
app.post("/signup",(req,res,next)=>{
  const{username,password,phnumber,address,email}=req.body;
  console.log(username,password)
  try{
    let ud=new Mainuser({
      username,
      password,
      phnumber,
      address,
      email
    })
    ud.save();
    return res.status(200).json({msg:"success"})
  }

  catch(err)
  {
console.log("error")
  }

})

app.get("/loguser/:useor/:pass",async(req,res,next)=>{
  const user=req.params.useor;
  const pass=req.params.pass;
  let useid;
  let usename;
  let loc;
  let ph
  let mail
  try{
    let us=await Mainuser.find({username:user,password:pass});
    if(us.length==0)
    {
return res.status(200).json({msg:"not found"})
    }
    else{
      useid=us[0]._id;
      usename=us[0].username;
      loc=us[0].address;
      ph=us[0].phnumber;
      mail=us[0].email;



      return res.status(200).json({msg:"found",useid,usename,loc,ph,mail})
    }
  }
  catch(err)
  {
    console.log("error")
  }
})
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images')
  },
  filename: function (req, file, callback) {
    callback(null,file.originalname)
  }
})
const upload = multer({ storage: storage });
app.post("/addproduct",upload.single("file"),(req,res,next)=>{
const profile= (req.file) ? req.file.originalname : null
const{disc,item,cost}=req.body
let newpro=new Pro({
  item,
  disc,
  profile,
  cost
})
try{
  newpro.save();
  return res.status(200).json({msg:"done"})
}
catch(err)
{
  console.log("error")
}
  
})
app.use(express.static('public'))
app.get("/getpro",async(req,res,next)=>{
  try{
    let proinfo=await Pro.find()
    if(proinfo.length==0)
    {
      return res.status(200).json({msg:"not found"})
    }
    else{
      return res.status(200).json({msg:"found",proinfo})
    }
  }
  catch(err){
    console.log(err)
  }
})

// app.put('/putstuddata',upload.single("file"),(req,res,next)=>
//   {
// const profile= (req.file) ? req.file.originalname : null

//       const{names,pinno,branch,year,section,from,to,subject,mail}=req.body
//       let day= new Date()
//       let status="not responded"
//               const leave=new leavedat({
//           names,
//           pinno,
//           year,
//           branch,
//           section,
//           mail,
//           from,
//           to,
//           day,
//           subject,
//        profile,
//        status
//       })
//       try{
//           leave.save()
//           return res.status(201).json({ msg: 'submited' });
//       }
//       catch(err)
//       {
//           console.log('not inserted')
//       }
//   })
app.delete("/delpro/:e",async(req,res,next)=>{
  const data=req.params.e;
  try{
    let user=await Pro.findByIdAndDelete(data)
    return res.status(200).json({msg:"deleted"})
  }
  catch(err)
  {
console.log(err);
  }
})
app.post("/postorder",(req,res,next)=>{
  const{user,itemname,itemdisc,image,qty,cost,place,phn,name,mail}=req.body;
  let mal="kjanrdhanarajesh@gmail.com"
  let date=new Date();

  try{
    let new_order=new Order({
      user,
      itemdisc,
      itemname,
      image,
      name,
      date,
      qty,
      cost,
      place,
      phn

    })
    new_order.save();
    var transpo = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'scriptingcoder25@gmail.com',
        pass: 'dzns vyoi lqak yddb'
      }
    });
    
    var mailOpti = {
      from: 'scripringcoder25@gmail.com',
      to:`${mail}, ${mal}`,
      subject: 'order confirmation',
      html:"mr/mrs "+" "+name+" "+"your order"+" "+itemname+" of quantity "+qty+" is confirmed which is ordered on "+date+"and it will be delivered to the address "+place+" in 2hrs and the total amount to be payable at the time of delivery is "+cost+"."+" phno:"+phn,
    }
    
    transpo.sendMail(mailOpti, function(error, info){
      if (error) {
        console.log(error);
      } else {
      //   console.log('Email sent: ' + info.response);
        return res.status(242).json({msg:'no'})
      }
        });
        
    return res.status(200).json({msg:"done"})
  }
  catch(err)
  {
    console.log("error")
  }
})

app.use(express.static('public'))

app.get("/getorder/:user_id",async(req,res,next)=>{
  const userid=req.params.user_id;
  try{
    let userorder=await Order.find({user:userid});
    return res.status(200).json({msg:"found",userorder});
  }
  catch(err){
    console.log("error")
  }

})
app.get("/getor",async(req,res,next)=>{
  try{
    let orders=await Order.find();
    return res.status(200).json({orders})
  }
  catch(err)
  {
    console.log(err)
  }
})

app.put("/putstat/:r/:st",async(req,res,next)=>{
  const user=req.params.r;
  const status=req.params.st;
  try{
    let order=await Order.findByIdAndUpdate(user,{
      status
    })
    return res.status(200).json({msg:"order delivered"})
  }
  catch(err)
  {
    console.log(err)
  }
})