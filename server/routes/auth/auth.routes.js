import express from 'express';
import { Signup, Signin} from '../../controllers/auth/auth.controller.js';


const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin)

export default router;