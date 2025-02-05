import express from "express";
// for req validation 
import {body} from "express-validator"
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", [
                body('email').isEmail().withMessage("Ionvalid Email"),
                body("fullname.firstname").isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
                body("password").isLength({min:6}).withMessage("Password must be 6 character long.")
            ],
            registerUser
)

router.post("/login", [
                body('email').isEmail().withMessage("Invalid Email"),
                body('password').isLength({min:6}).withMessage("Password must be 6 character long.")
            ],
            loginUser
)

export default router;