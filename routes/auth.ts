import { Request, Response, Router } from "express";
import passport from "passport";
import User from "../models/User";

const router = Router()
router.get("/login/success",async (req, res) => {
  if (req.user) {
    const currentUser = await User.findById(req.user)

    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
  else {
    res.status(401).json({status:"fail",message:"Not Authorized"})
  }
});

router.get("/google",passport.authenticate("google",{scope:["profile"]}))

router.get("/google/callback", passport.authenticate("google",{failureRedirect:"/"}),(req:Request,res:Response)=>{
    res.redirect("http://localhost:3000/home")
})

router.get("/logout",(req:Request,res:Response)=>{
    req.logout()
    res.redirect("/")
})

export default router