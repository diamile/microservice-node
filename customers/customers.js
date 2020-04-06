const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Customer = require('./Customer')
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/customservice', { useUnifiedTopology:true, useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")



app.post('/customers',async(req,res)=>{

    try{

     const customer = await new Customer({
         name:req.body.name,
         age:req.body.age,
         address:req.body.address
     });

     customer.save()
     .then(()=>console.log('new customer added'));

    }catch(err){
        if(err){
           res.json({message:err})
        }
    }
   
})


app.get('/customers',async(req,res)=>{
    try{
        const customers = await Customer.find();

        res.json(customers);

    }catch(err){
        res.json({message:err});
    }
})



app.get('/customers/:id',async(req,res)=>{
    const customer= await Customer.findById(req.params.id);
    try{
        res.json(customer)
    }
    catch(err){
        res.json({message:err})
    }
});

app.get('/customers/:id/:name',(req,res)=>{
    console.log(req.params);
    res.json(req.params)
});

app.delete('/customers/:id',async(req,res)=>{
   
    try{
    const removeCustomers= await Customer.remove({_id:req.params.id});
    res.json(removeCustomers)
    }
    catch(err){
        res.json({message:err})
    }
});


//update post
app.patch('/customers/:id',async(req,res)=>{
   
    try{
        const updatePost= await Customer.updateOne({_id:req.params.id},{$set:{
            name:req.body.name,
            age:req.body.age,
            address:req.body.address,
            }});
    res.json(updatePost)
    }
    catch(err){
        res.json({message:err})
    }
});


const PORT=5555;

app.listen(5555,()=>{console.log('customers service is running on port'+ PORT)})