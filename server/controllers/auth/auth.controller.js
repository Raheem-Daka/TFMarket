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
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({
                message: "User does not exist, Please register.",
                success: false
            })
        };

        const existPassword = await bcrypt.compare(password, existingUser.password);
        if (!existPassword) return res.jsno({
            success: false,
            message: "Incorrect password, Please try again."
        });
        const token = jwt.sign({
            id: existingUser._id,
            role: existingUser.role,
            email: existingUser.email
        }, "SECRET_KEY", { expiresIn: "60m"})

        res.cookie(
            'token',
            token,
            {
                httpOnly: true,
                secure: false
            }
        ).json({
            success: false,
            message: "Successfully signed in",
            user: {
                email: existingUser.email,
                role: existingUser.role,
                id: existingUser._id
            }
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured during signin"
        })
    }
}
