const router = require("express").Router();
const controller = require("../controllers/place");
const {requireAuth} =  require('../middleware/authentication');


// puplic user
router.get("", controller.places);
router.post("",requireAuth, controller.create);
router.get("/top", controller.TopratedPlaces);
router.get("/details/:place_id", controller.placeDetails);
router.get("/related/:place_id", controller.RelatedPlaces);
// router.post("/nearest",controller.nearestPlaces);

// add rating place/add-rating/place_id
router.post("/add-rating/:id",requireAuth, controller.addRatingToPlace);

// add comment to place/crate-comment/place_id
router.post("/add-comment/:id",requireAuth, controller.addCommentToPlace);

module.exports = router;
