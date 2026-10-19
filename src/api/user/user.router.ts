import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/local/authenticated.middleware';
import { validate } from '../../utils/validation-middleware';
import { list } from './user.controller';
import { ListUsersDto } from './user.dto';

const router = Router();

router.get('/', isAuthenticated, validate(ListUsersDto, 'query'), list);

export default router;