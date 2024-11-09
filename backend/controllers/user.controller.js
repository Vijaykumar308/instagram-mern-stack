import User from "./../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            return res.status(401).json({
                message: "username, email or password is missing",
                success: false
            });
        }

        const user = User.findOne({$or:[{email}, {username}]});
        if(user) {
            return res.status(401).json({
                message: "username or email already exist",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashPassword,

        })

        return res.status(201).json({
            message: "Account created Successfully",
            success: true
        })

    }
    catch(err) {
        console.log(err);
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(401).json({
                message: "email or password is missing",
                success: false
            });
        }

        let user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                message: "Incorrect Email or Password",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect Email or Password",
                success: false
            })
        }

        const token = jwt.sign({userId: user._id,},process.env.SECRET_KEY, {
            expiresIn:'1d'
        });

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: user.posts
        } 

        return res.cookie('token', token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).
        json({
            message:`Welcome back ${user.username}`,
            success:true,
            user
        });


    }
    catch(err) {
        console.log(err);
    }
}

export const logout = async(_, res) => {
    try{
        return res.cookie('token', '', {maxAge:0}).json({
            message: 'Logged out successfully',
            success:true
        });
    }
    catch(err) {
        console.log(err);
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

