
import { validationResult } from "express-validator"
import { createCaptain } from "../services/captain.service.js";
import { captainModel } from "../models/captain.model.js";

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