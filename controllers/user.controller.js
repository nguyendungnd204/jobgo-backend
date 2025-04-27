import UserService from '../services/user.service.js';
import getDatauri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const file = req.file;
        const fileUri = getDatauri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content); 

        const newUser = await UserService.register({ fullname, email, phoneNumber, password, role, cloudResponse });
        
        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const { user, token } = await UserService.login({ email, password, role });

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        }).status(200).json({
            message: `Welcome back ${user.fullname}`,
            success: true,
            user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Login failed",
            success: false,
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",
            success: true,
        })
    } catch (error) {
        console(error);
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id; 
        const file = req.file;

        const fileUri = getDatauri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        console.log("Backend received:", { fullname, email, phoneNumber, bio, skills, skills, file });
        let skillsArray = [];
        if(skills) {
           skillsArray = skills.split(",")
        }
        
        let user = await UserService.updateUserInfo(userId, fullname, email, phoneNumber, bio, skillsArray, cloudResponse, file)
        res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: user
        })
    } catch(error){
        console.log(error);
    }
}