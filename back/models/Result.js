const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PollutionSchema = new Schema({
    ts:{
        type : String
    },
    aqius: {
        type:Number
    },
    mainus:{
        type:String
    },
    aqicn:{
        type:Number
    },
        maincn:{
            type:String
        }

},{timestamps:true});
const Result =mongoose.model('Pollution',PollutionSchema);
module.exports = Result;