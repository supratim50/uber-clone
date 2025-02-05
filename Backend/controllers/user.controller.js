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