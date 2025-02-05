import { userModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }

    const {fullname, email, password} = req.body;

    const hashedpassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname : fullname.firstname, 
        lastname: fullname.lastname, 
        email, 
        password: hashedpassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});

}

export const loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();

    // set token in cookie
    res.cookie('token', token);

    res.status(200).json({token, user});
}

export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}