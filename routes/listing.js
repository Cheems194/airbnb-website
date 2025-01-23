const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/expressError.js");
const Listing=require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController=require("../controller/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(validateListing,wrapAsync(listingController.newListingInIndex));

router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));

router.route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.editListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;