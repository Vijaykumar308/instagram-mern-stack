import User from "./../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utlis/datauri.js";
import cloudinary from "../utlis/cloudinary.js";

export const testRoute = async(req, res) => {
    try {
        console.log('working');
        res.status(201).json({
            success:true,
            message:"route working..."
        })
    }
    catch(err) {
        console.log('err:', err);
    }
}

export const register = async(req, res) => {
    console.log('register call');
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            return res.status(401).json({
                message: "username, email or password is missing",
                success: false
            });
        }

        const user = await User.findOne({$or:[{email}, {username}]});

        if(user) {
            return res.status(401).json({
                message: "username or email already exist",
                success: false,
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

export const editProfile = async(req, res) => {
    try {
        const userId = req.id;
        const {bio, gender} = req.body;

        // MIME type data come in req.file;
        const profilePicture = req.file;

        let couldResponse;
        if(profilePicture)  {
            const fileUri = getDataUri(profilePicture);
            couldResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById({_id:userId});
        if(!user) {
            return res.status(401).json({
                message:'User not found',
                success: true
            });
        }

        if(bio) { user.bio = bio; }
        if(gender) { user.gender = gender; }
        if(profilePicture) { user.profilePicture = couldResponse.secure_url; }

        await user.save();

        return res.status(200).json({
            message:'Profile Updated',
            success:true,
            user
        });
    }
    catch(err) {
        console.log(err);
    }
}

export const getSuggstedUser = async(req, res) => {
    try {
        const suggestedUser = await User.find({
            _id:{$ne:req.id}
        }).select("-password");
        if(!suggestedUser) {
            return res.status(400).json({
                message:'Currencty do not have any user',
                success:false,
            })
        }

        return res.status(400).json({
            user: suggestedUser,
            success:true,
        })
    }
    catch(err) {
        console.log(err);
    }
}

export const followOrUnfollow = async (req, res) => {
    try {
        const loggedInUserAccount = req.id; 
        const otherUser = req.params.id;
        if (loggedInUserAccount === otherUser) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(loggedInUserAccount);
        const targetUser = await User.findById(otherUser);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(otherUser);
        if (isFollowing) {
            // unfollow logic
            await Promise.all([
                User.updateOne({ _id: loggedInUserAccount }, { $pull: { following: otherUser } }),
                User.updateOne({ _id: otherUser }, { $pull: { followers: loggedInUserAccount } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // following logic
            await Promise.all([
                User.updateOne({ _id: loggedInUserAccount }, { $push: { following: otherUser } }),
                User.updateOne({ _id: otherUser }, { $push: { followers: loggedInUserAccount } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}



