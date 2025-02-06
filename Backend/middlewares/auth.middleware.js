import blacklistTokenModel from "../models/blacklistToken.model.js";
import { captainModel } from "../models/captain.model.js";
import { userModel } from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";

// MIDDLEWARE FOR USER
export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({message: 'Unauthorized user.'})

        const isBlackListed = await blacklistTokenModel.findOne({token});
        if(isBlackListed) {
            res.status(401).json({message: "Unauthorized user."});
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized user."})
    }
}

// MIDDLEWARE FOR CAPTAIN
export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    // console.log("From Middleware ",token)

    if(!token) return res.status(401).json({message: "Unauthorized captain."});

    const isBlackListed = await blacklistTokenModel.findOne({token});
    console.log(isBlackListed)
    if(isBlackListed) return res.status(401).json({message: "Unauthorized captain.."});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if(!captain) return res.status(401).json({message: "Unauthorized captain..."})

        req.captain = captain;
        return next();
    } catch (error) {
        // console.log(error);
        return res.status(401).json({message: "Unauthorized captain...."});
    }

}