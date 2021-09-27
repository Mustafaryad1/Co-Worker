const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    text: {
      type:String,
      required:true
    }
  },{
    timestamps:true
  })
);

module.exports = Comment;
