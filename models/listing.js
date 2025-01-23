const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:String,
    image: {
        type: String,
        default: "https://www.google.com/imgres?q=sunrise&imgurl=https%3A%2F%2Fwebneel.com%2Fwallpaper%2Fsites%2Fdefault%2Ffiles%2Fimages%2F05-2014%2F1-sunrise.jpg&imgrefurl=https%3A%2F%2Fwebneel.com%2Fsunrise-photography&docid=HNkBUjzvxf7lmM&tbnid=o5HRvI3QtmJInM&vet=12ahUKEwiEirWBmriKAxV0na8BHWSJNFcQM3oECCwQAA..i&w=1600&h=1200&hcb=2&ved=2ahUKEwiEirWBmriKAxV0na8BHWSJNFcQM3oECCwQAA",
        set: (v) => v===""?"https://www.google.com/imgres?q=sunrise&imgurl=https%3A%2F%2Fwebneel.com%2Fwallpaper%2Fsites%2Fdefault%2Ffiles%2Fimages%2F05-2014%2F1-sunrise.jpg&imgrefurl=https%3A%2F%2Fwebneel.com%2Fsunrise-photography&docid=HNkBUjzvxf7lmM&tbnid=o5HRvI3QtmJInM&vet=12ahUKEwiEirWBmriKAxV0na8BHWSJNFcQM3oECCwQAA..i&w=1600&h=1200&hcb=2&ved=2ahUKEwiEirWBmriKAxV0na8BHWSJNFcQM3oECCwQAA":v
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;