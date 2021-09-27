const router = require("express").Router();
const controller = require("../controllers/place");
const {requireAuth} =  require('../middleware/authentication');


// puplic user
router.get("", controller.places);
router.get("/:id", controller.placeDetails);
router.post("",requireAuth, controller.create);
// router.post("/nearest",controller.nearestPlaces);

// add rating place/add-rating/place_id
router.post("/add-rating/:id",requireAuth, controller.addRatingToPlace);

// add comment to place/add-comment/place_id
router.post("/add-comment/:id",requireAuth, controller.addCommentToPlace);

// add comment to place/add-room/place_id
router.post("/add-room/:id",requireAuth, controller.addRoomToPlace);


module.exports = router;
