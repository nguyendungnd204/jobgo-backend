import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
class UserService {
    async register(userData) {
        const { email, password, cloudResponse } = userData;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw { 
                message: "Email already exists",
                statusCode: 400
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }

    async login({ email, password, role }) {
        const user = await User.findOne({ email });
        
        if (!user) {
            throw { 
                message: "Email or password is incorrect",
                statusCode: 400,
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw {
                message: "Email or password is incorrect",
                statusCode: 400,
            };
        }

        if (role !== user.role) {
            throw {
                message: "Account doesn't exist with this role",
                statusCode: 400,
            };
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { user: userWithoutPassword, token };
    }

    async updateUserInfo(id, fullname, email, phoneNumber, bio, skillsArray, cloudResponse, file){
        try {
            const user = await User.findById(id);
            if(!user){
                throw new Error('User not found');
            }
            if(!user.profile) {
                user.profile = {}; 
            }
            if(fullname) user.fullname = fullname;
            if(email) user.email = email;
            if(phoneNumber) user.phoneNumber = phoneNumber;
            if(bio) user.profile.bio = bio;
            if(skillsArray) user.profile.skills = skillsArray;
            if(cloudResponse){
                user.profile.resume = cloudResponse.secure_url
                user.profile.resumeOriginalName = file.originalname
            }
    
            await user.save();
    
            return user;
        } catch (error) {
            console.error("Error updating user info:", error);
            throw error; 
        }
       
    }
}

export default new UserService();