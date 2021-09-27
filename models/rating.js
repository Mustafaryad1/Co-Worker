const mongoose = require("mongoose");

const Rating = mongoose.model(
  "Rating",
  new mongoose.Schema({
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    place: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Place",
      required:true
    },
    rate_value: {
        type:Number,
        default:0,
        required:true,
        enum:[0,1,2,3,4,5]
      }
  
  },{
    timestamps:true
  })
);

module.exports = Rating;