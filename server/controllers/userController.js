import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { validationResult } from "express-validator";

// Signup a new user
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio){
            return res.status(400).json({success: false, message: "Missing Details"})
        }

        const user = await User.findOne({ email });

        if (user){
            return res.status(409).json({success: false, message: "Account already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id)

        res.json({success: true, userData: newUser, token, message: "Account Created Successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message}); 
    }

}

// controller to login a user
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
       const { email, password } = req.body; 
       const userData = await User.findOne({email})

       if (!userData) {
            return res.status(401).json({success: false, message: "Invalid Credentials"});
       }

       const isPasswordCorrect = await bcrypt.compare(password, userData.password);

       if (!isPasswordCorrect){
            return res.status(401).json({success: false, message: "Invalid Credentials"});
       }

       const token = generateToken(userData._id)

       res.json({success: true, userData, token, message: "Login Successful"});


    } catch (error) {
       console.log(error.message);
       res.status(500).json({success: false, message: error.message});  
    }
}
// controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}

// controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;

        const userId = req.user._id;
        let updatedUser;

        if (!profilePic){
           updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true}); 
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true});
        }
        res.json({success: true, user: updatedUser})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message})
    }
}