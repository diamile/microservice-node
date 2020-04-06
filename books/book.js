const mongoose = require('mongoose');


const PostSchemas = mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true
    },
    numberPage:{
        type:Number,
        require:false
    },

    publisher:{
        type:String,
        require:false
    }


});

module.exports=mongoose.model("Book",PostSchemas);