import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req?.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            });
        }

        // Verify and decode the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        // Add the userId to the request object
        req.id = decode.userId;

        // Continue to the next middleware
        next();
    } catch (err) {
        // Handle errors related to token verification
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token',
                success: false,
            });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired',
                success: false,
            });
        } else {
            console.error(err);
            return res.status(500).json({
                message: 'An error occurred during authentication',
                success: false,
            });
        }
    }
};

export default isAuthenticated;