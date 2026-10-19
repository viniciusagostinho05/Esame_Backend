import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/local/authenticated.middleware";
import { isTeacher } from "../../utils/auth/local/role.middleware";
import { validate } from "../../utils/validation-middleware";
import { CreateClassroomDto } from "./classroom.dto";
import { add, list } from "./classroom.controller";
import assignmentRouter from "../assignments/assignment.router";

const router = Router();

router.use(isAuthenticated);

router.post('/', isTeacher, validate(CreateClassroomDto, 'body'), add);
router.get('/', list);

router.use('/:classroomId/assignments', assignmentRouter);

export default router;