const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FilterSetSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
     },
     filterName:String,
     images:[{
        code:String,
        imagelink:String
     }]
}, {
    timestamps: true
  })

module.exports = mongoose.model('FilterList', FilterSetSchema)