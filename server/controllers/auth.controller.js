
import User from "../models/user.model.js";
import genToken from "../config/token.js";

export const googleAuth = async(req, res) => {
    try {
        const {name, email} = req.body;
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({name, email});
        }
        
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({message: "User logged in successfully", user, token});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});

    }


}

export const logout = async(req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}