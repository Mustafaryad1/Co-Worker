const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    place: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Place",
      required:true
    },
    price: {
      type:Number,
      required:true
    },
    person: {
        type:Number,
        required:true
    },
    description:{
        type:String,
    }
  },{
    timestamps:true
  })
);

module.exports = Room;
