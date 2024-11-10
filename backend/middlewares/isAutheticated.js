import jwt from "jsonwebtoken";

const isAutheticated = async(req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success:false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if(!decode) {
            res.status(401).json({
                message: "Invalid",
                success: false
            });
        }

        req.id = decode.userId;
        next();
    }
    catch(err) {
        console.log(err);
    }
}

export default isAutheticated;