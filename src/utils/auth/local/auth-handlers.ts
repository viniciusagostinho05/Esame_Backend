import { User as AppUser } from "../../../api/user/user.entity";
import './local-strategy';
import './jwt/jwt-strategy';

declare global {
  namespace Express {
    interface User extends AppUser {

    }
  }
}
