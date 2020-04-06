const express = require('express');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const Order = require('./Order');
const axios = require('axios');
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/orderservice', { useUnifiedTopology:true, useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


app.post('/order',async(req,res)=>{
    try {
        const order = await new Order({
            CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
            BookID:mongoose.Types.ObjectId(req.body.BookID),
            initialDate:req.body.initialDate,
            deliveryDate:req.body.deliveryDate
        })

        order.save()
        .then(()=>{console.log('Order saved success')})
        
    }catch(err){
        if(err){
            res.json({message:err})
        }
    }
   
});

app.get('/order',async(req,res)=>{
   try{
  const orders = await Order.find();
  res.json(orders)

   }catch(err){
       if(err){
           res.json({message:err})
       }
   }
});


app.get('/order/:id',(req,res)=>{
    Order.findById(req.params.id).then((order)=>{
       if(order){
           axios.get('http://localhost:5555/customers/'+ order.CustomerID)
           .then((response)=>{
              var result = {customerName:response.data.name,bookTitle:''};

            axios.get('http://localhost:4545/books/'+order.BookID)
            .then((response)=>{
                result.bookTitle=response.data.title;
                res.json(result);
            })
            })
           .catch((err)=>res.json({message:err}))

          
       }else{
        res.send('Invalid order');
       }

      
    })
 });

 app.patch('/order/:id',async(req,res)=>{
    try{
   const orders = await Order.findById(req.params.id);
   res.json(orders)
 
    }catch(err){
        if(err){
            res.json({message:err})
        }
    }
 });


 app.delete('/order/:id',async(req,res)=>{
    try{
   const orders = await Order.remove({_id:req.params.id});
   res.json(orders)
 
    }catch(err){
        if(err){
            res.json({message:err})
        }
    }
 });


app.listen(7777,()=>console.log('service orders is running'))