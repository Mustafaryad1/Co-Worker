const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true,
      lowercase:true 
      },
    description: { 
      type: String,
       required: true 
      },
    location: { 
      type: {
         type: String,
         default:"Point" 
      },
      coordinates: [],
      },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
      }],
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    rates:{
        type:Number,
        default:0
    },
    rating:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Rating"
    }],
    favorites_count:{
      type:Number,
      default:0,
    },
    tags: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Tags"
    }],
    workStart: {
      type: Number 
    },
    workEnd: { 
      type: Number
    },
    city: {
      type:String,
    },
    minBudget: {
      type:Number,
      default:100
    },
    phone: { 
      type: String 
    },
    isApproved:{
      type:Boolean,
      default:false
    },
    isAdvertise:{
      type:Boolean,
      default:false
    },
    images: [{ type: String}],
    
    // reviews: [
    //   {
    //     type: Array,
    //     review: {
    //       username: { type: String },
    //       comment: { typr: String },
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);
PlaceSchema.index({ location: '2dsphere' });

// PlaceSchema.pre('save',function(next,done){
//     this.location.collection.push(31.2357).push(31.2357)
//     done()
//   })

const Place = mongoose.model("Place", PlaceSchema, "coWorkerPlaces");

module.exports = Place;
