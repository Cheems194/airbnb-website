const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res) =>{
    res.render("users/signup.ejs");
}
module.exports.postSignupInfo=async(req,res) =>{
    try{
        let {username,email,password}=req.body;
        const newUSer=new User({email,username});
        const registeredUSer=await User.register(newUSer,password);
        console.log(registeredUSer);
        req.login(registeredUSer,(err) =>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to Airbnb!");
            res.redirect("/listings");
        })
    }catch(error){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req,res) =>{
    res.render("users/login.ejs");
};

module.exports.postLoginInfo=async(req,res) =>{
    req.flash("success","Your are successfully logged in!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser=(req,res,next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","You have successfully logged out");
        res.redirect("/listings");
    });
};