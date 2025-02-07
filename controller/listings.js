const Listing=require("../models/listing.js");

module.exports.index=async (req,res) =>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res) =>{
    res.render("listings/new.ejs")
};

module.exports.show=async(req,res) =>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path: "reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Requested listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.newListingInIndex=async (req,res,next) =>{
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
};

module.exports.renderEditForm=async (req,res) =>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Requested listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.editListing=async (req,res) =>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async (req,res) =>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
};