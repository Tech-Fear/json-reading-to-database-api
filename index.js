const express=require('express');
const mongoose=require('mongoose')
const fs=require('fs').promises;
const Items=require('./Schema/items.schema.js')
const app=express();
const URL="" //Your MongoDB Url 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const port = process.env.PORT || 3000;
let jsonData;
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(async()=>{
    console.log("Connection to Database established successfully.")
    try{
        const jsonData=await fs.readFile('./src/data.json','utf8')
        const items=JSON.parse(jsonData)
        for(const item of items){
            const existing=await Items.find({Name:item.Name})
            if(existing.length===0){
                const appendItem=await Items.create(item);
                console.log(`New Data Successfully appended`)
            }
        }
        // await Items.insertMany(items)
        // console.log("Data inserted Successfully.")
    }
    catch(error){
        console.log(`error ${error.message}`);
    }
    console.log("Starting the server ........")
    app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});
})
.catch((error)=>{
    console.log("Connection to database failed")
    console.log(`Error: ${error.message}`)
})
//View Data through Api
app.get("/api/items/",async(req,res)=>{
    try{
        const item=await Items.find({})
        res.status(200).send(item);
    }
    catch(error){
        res.status(500).send({message:`Internal Server Error ${error.message}`})
    }
})
// Api to get particular item By Id
app.get("/api/items/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const item= await Items.findById(id);
        res.status(200).send(item);
    }
    catch(error){
        res.status(400).send({message:` Item not found. ${error.message}`})
    }
})
                // Test Functions
// Get item detail by Name
app.get("/api/items/searchName/:name",async(req,res)=>{
    try{
        const {name}=req.params;
        const nameS=name[0].toUpperCase()+name.slice(1);
        const item=await Items.findOne({Name:nameS})
        res.status(200).send(item)
    }
    catch(error){
        res.status(500).send(`error occured ${error.message}`)
    }
})

// Send data to DataBase
app.post("/api/items",async(req,res)=>{
    try{
        const item= await Items.create(req.body);
        res.send(`Entry Created Successfully ${item}`);
    }
    catch(error){
        res.status(500).send({message:`Server Error ${error.message}`});
    }
})
// Update Item in DataBase
app.put("/api/items/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const item=await Items.findByIdAndUpdate(id,req.body);
        if(!item){
            return res.status(404).send({message:`Item not found in the database`});
        }
        try{
            res.status(200).send({message: `Update Successfull`});
        }
        catch(error){
            res.status(500).send({message: `error occurred ${error.message}`});
        }
    }
    catch(error){
        res.status(500).send({message:`error occurred ${error.message}`});
    }
})
// Delete from Database
app.delete("/api/items/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const item= await Items.findByIdAndDelete(id);
        if(!item){
            return res.status(404).send({message:`Item not in the database ${error.message}`})
        }
        res.status(200).send({message:`Item deleted from database`});
    }
    catch(error){
        res.status(500).send({messge:`error occurred ${error.message}`})
    }
})