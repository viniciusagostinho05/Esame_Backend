import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { LoginDto, RegisterDto } from "./auth.dto";
import { login, register } from "./auth.controller";

const router = Router();

router.post('/register',register);
router.post('/login', validate(LoginDto, 'body'), login);

export default router;
