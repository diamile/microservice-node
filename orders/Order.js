const mongoose = require('mongoose');


const OrderSchemas = mongoose.Schema({
    CustomerID:{
      type:mongoose.SchemaTypes.ObjectId,
      required:true
    },

    BookID:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },

    initialDate:{
        type:Date,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Orders',OrderSchemas);