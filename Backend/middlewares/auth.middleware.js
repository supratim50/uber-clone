import blacklistTokenModel from "../models/blacklistToken.model.js";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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