const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./book.js');
const app = express();
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/booksservice', { useUnifiedTopology:true, useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")




app.get('/books',async(req,res)=>{

    try{
        const books = await Book.find();

        res.json(books);

    }catch(err){
        res.json({message:err});
    }
   
});


app.post('/books',(req,res)=>{
   const PostBook = new Book({
       title:req.body.title,
       author:req.body.author,
       numberPage:req.body.numberPage,
       publisher:req.body.publisher
   })

   PostBook.save()
   .then(()=>console.log('new added'))
.catch((err)=>{if(err){throw err;}})
res.send("A new Book created with succsess");
})



app.get('/books/:id',async(req,res)=>{
    const book= await Book.findById(req.params.id);
    try{
        res.json(book)
    }
    catch(err){
        res.json({message:err})
    }
});

app.get('/book/:id/:name',(req,res)=>{
    console.log(req.params);
    res.json(req.params)
});

app.delete('/books/:id',async(req,res)=>{
   
    try{
    const removeBook= await Book.remove({_id:req.params.id});
    res.json(removeBook)
    }
    catch(err){
        res.json({message:err})
    }
});


//update post
app.patch('/books/:id',async(req,res)=>{
   
    try{
        const updatePost= await Book.updateOne({_id:req.params.id},{$set:{
            title:req.body.title,
            author:req.body.author,
            numberPage:req.body.numberPage,
            publisher:req.body.publisher}});
    res.json(updatePost)
    }
    catch(err){
        res.json({message:err})
    }
});

app.listen(4545,()=>{console.log('Up and running --this is our service ')})