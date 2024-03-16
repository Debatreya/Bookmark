import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken"

const isLoggedIn = async (req, res, next) => {
    // console.log("Start isLoggedIn");
    console.log(req)
    console.log("Cookies", req.cookies);
    const { token } = req.cookies;
    console.log("Token: ", token);
    if(!token){
        return next(new AppError("Unauthenticated, please login again", 401));
    }
    try{
        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("In Auth middleware");
        req.user = userDetails;
        console.log(userDetails);
        console.log("END isLoggedIN");
        next();
    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

const authorizedRoles = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError("You are not authorized", 400))
    }
    next();
}

const authorizeSubscriber = async (req, res, next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;
    if(currentUserRole !== 'ADMIN' && subscription.status != 'active'){
        return next(new AppError('Please subscripbe to access this route', 403))
    }
    next();
}
export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber,
}