const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main()
    .then(() =>{
        console.log("DB connected");
    })
    .catch((err) =>{
        console.log(err);
    })
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
const initDB= async() =>{
    await Listing.deleteMany({});
    initdata.data= initdata.data.map((obj) =>({...obj,owner: "6787e9229e74e2a99592402d"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initDB();
