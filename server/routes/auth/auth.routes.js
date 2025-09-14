import express from 'express';
import { Signup, Signin, Logout, authMiddleware} from '../../controllers/auth/auth.controller.js';


const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/logout", Logout);
router.get("/checkauth", authMiddleware, (req, res,) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user,
    })
})

export default router;