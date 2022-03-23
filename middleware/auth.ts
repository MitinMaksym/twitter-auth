import { NextFunction, Request, Response } from "express"

export const ensureAuth = (req:Request,res:Response,next:NextFunction) => {
    if (req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/')
    }
}

export const ensureGuest = (req:Request,res:Response,next:NextFunction) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    } else {
        return next()
    }
}