import { Router } from "express";
import { validate } from "../../utils/validation-middleware";
import { isStudent, isTeacher } from "../../utils/auth/local/role.middleware";
import { AssignmentParams, ClassroomParams, CreateAssignment } from "./assignment.dto";
import { add, complete, list } from "./assignment.controller";

const router = Router({ mergeParams: true });

router.get<ClassroomParams>('/', validate(ClassroomParams, 'params'), list);

router.post<ClassroomParams>('/', isTeacher, validate(ClassroomParams, 'params'), validate(CreateAssignment, 'body'),add);

router.patch<AssignmentParams>('/:id', isStudent, validate(AssignmentParams, 'params'), complete);

export default router;