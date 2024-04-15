const express=require('express');
const cors=require('cors');

const mongoose=require('mongoose')


const app=express()
app.use(cors());
app.use(express.json())

const PORT=process.env.PORT || 8080


const schemaData=mongoose.Schema({
    Bankcode:String,
    Bankname:String,
    Accountno:String
},{
    timestamps:true
})




const userModel=mongoose.model("user",schemaData)


app.get("/",async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})



//create data save data to mongodb
/*

  {
    all detals
  }
*/
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save()
    res.send({success:true,message:"data save successfully",data:data})
})

//update data

/*

id,
rest what need to e updated
*/
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body

    const data=await userModel.updateOne({_id:_id},rest)
    res.send({success:true,message:"data updated",data:data})
})


app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted successfully",data:data})
    console.log(id)
})

mongoose.connect("mongodb://localhost:27017/crud")
.then(()=>{
    console.log("connect to Db")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))
