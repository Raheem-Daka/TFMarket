import bcrypt from 'bcryptjs'; // ✅ fixed typo
import User from '../../models/user.js';

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
                message: 'User already exists',
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

export const Signin = async (req, res) => {}
