import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from "./user/user.router";
import classroomRouter from "./classroom/classroom.router";

const router = Router();

router.use('/users', userRouter);
router.use('/classrooms', classroomRouter);
router.use(authRouter);

export default router;