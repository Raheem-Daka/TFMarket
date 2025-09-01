import bcrypt from 'bcryptjs'; // ✅ fixed typo
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';

export const Signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists, Please use a different email',
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Successfully registered user',
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred during signup',
        });
    }
};

export const Signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const existingUser = await User.findOne({ email });
        
        // If user doesn't exist, send a 404 error
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
                
            });
        }

        // Compare the provided password with the hashed password in the DB
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Create JWT token if the user exists and the password is correct
        const token = jwt.sign({
            id: existingUser._id,
            role: existingUser.role,
            email: existingUser.email
        }, process.env.JWT_SECRET || "SECRET_KEY", { expiresIn: "60m" });

        // Set the token as a cookie and send user details in the response
        res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE === 'production',  // Change this to true if you're using https in production
                sameSite: 'None',
                maxAge: 60 * 60 * 1000
            }).json({
            success: true,
            message: "Successfully signed in",
            user: {
                email: existingUser.email,
                role: existingUser.role,
                id: existingUser._id
            }
        });

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during signin, Please try again later"
        });
    }
};


export const Logout = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    })
}

export const authMiddleware = async (req, res, next) => {
    // Correctly access cookies using req.cookies
    const token = req.cookies?.token; 

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
        req.user = decoded; // Corrected to use req.user instead of res.user
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized User."
        });
    }
};
