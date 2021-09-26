const Place = require('../models/place');
const Rating = require('../models/rating');
const Comment = require('../models/comment');

module.exports.create = (req,res)=>{
          const body = JSON.parse(JSON.stringify(req.body));
          if (!body) {
            return res.status(400).json({
              success: false,
              error: "You must add place",
            });
          }
          body.isApproved = false;
          const place = new Place(body);
          if (!place) {
            return res.status(400).json({
              success: false,
              error: err
            });
          }
          place.location.coordinates = body.location;
          place.location.type = "Point";

          place.owner = req.user._id;
          // console.log(place.owner);
          place
            .save()
            .then(async (data) => {
              category.places.push(data._id);
              await category.save()
              return res.status(201).json({
                success: true,
                id: place._id,
                message: "Place item created",
              });
            })
            .catch((error) => {
                console.log(error)
              return res.status(400).json({
                error,
                message: "Place item not created",
              });
            });
};

module.exports.places = async(req,res)=>{
  const {skip=0,limit=10} = req.query;
  const places = await Place.find({});
  res.send({places})
};

module.exports.TopratedPlaces = (req,res)=>{
    res.send({ok:"l"})
}
module.exports.placeDetails = (req,res)=>{
    res.send({ok:"l"})
}
module.exports.RelatedPlaces = (req,res)=>{
    res.send({ok:"l"})
}

module.exports.addRatingToPlace = async (req, res) => {
    // console.log(req.user,req.params.id);
    // console.log('start');
    let place = await Place.findOne({'_id':req.params.id})
                           .catch(err => res.status(404).send({success:false,message:"Place not Found"})) // return null or return object 
    if(!place){
      res.status(404).send({success:false,message:"Place not Found"});
    }  
    // console.log(place);
    const place_user_rate = await Rating.findOne({
      user: req.user._id,
      place: req.params.id
    });
    // console.log(place_user_rate);
    if (!req.body.rate_value) {
      res.send({
        success: false,
        message: "you should add rating value"
      });
    }
    // // console.log(req.body);
    // let rates = 0
    let rating;
    if (!place_user_rate) {
    //   // console.log("yes it's first time");
    rating = new Rating(req.body);
    //   // console.log(rating);
      rating.user = req.user._id;
      rating.place = place._id;
      await rating.save().catch(err => {
        res.status(400).send({
              success:false,message:"value not valid you should enter one value from [0,1,2,3,4,5]"
        })})
      await Place.updateOne({'_id':place._id},{"$addToSet":{'rating':rating._id}})
      
      }
      else{
      //  rating =  await Rating.updateOne({'user':req.user._id,'place':place._id},{'rate_value':req.body.rate_value});
        place_user_rate.rate_value = req.body.rate_value;
        await place_user_rate.save().catch(err =>
          res.send({
            success:false,message:"value not valid you should enter one value from [0,1,2,3,4,5]"})
          )
      }
       let [{rates}]= await Rating.aggregate(
        [{
          $match:{
              place:place._id
        }},
          {
            $group: {
              _id: "$place",
              rates: {
                $sum: "$rate_value"
              }
            }
          }
        ],
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            return result
          }
        }
      );
    let place_rates = Math.ceil(rates/place.rating.length)
    // res.send({place_rates})
    await Place.updateOne({'_id':place._id},{'rates':place_rates})
    res.send({succes:true,place_rates})
};

module.exports.addCommentToPlace = async (req, res) => {
    const place = await Place.findById(req.params.id).catch(
      err => res.send({
          success: false,
          message: "place not exist"
        }
      ));
  
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must add comment",
      });
    }
    const comment = new Comment(body);
    if (!comment) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }
    comment.user = req.user._id;
    comment
      .save()
      .then((comment) => {
        place.comments.push(comment._id)
        place.save();
        console.log(comment.populate('user'));
        return res.status(200).json({
          success: true,
          id: comment._id,
          message: "Comment item created",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Comment item not created",
        });
      });
};
