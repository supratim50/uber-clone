
import { validationResult } from "express-validator"
import { createCaptain } from "../services/captain.service.js";
import { captainModel } from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

// POST register
export const registerCaptain = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty) {
        return res.status(401).json({error: error.array()});
    }

    const {
        fullname,
        email,
        password,
        vehicle
    } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist) {
        return res.status(400).json({message:"Captain is already exist"});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token, captain});

}
// POST login 
export const loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty) {
        return res.status(400).json({error: errors.array()})
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isPasswordMatch = await captain.comparePassword(password);

    if(!isPasswordMatch) {
        return res.status(401).json({message: "Invalid email or password"}); 
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, captain});

}
// GET captain profile
export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

export const logoutCaptain = async (req, res, next) => {

    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    console.log(token)

    await blacklistTokenModel.create({token});

    res.status(200).json({message: "Logged Out"});
}