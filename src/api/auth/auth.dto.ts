import { IsEmail, IsString, IsUrl, Matches, IsIn } from "class-validator";

export class RegisterDto {
  @IsEmail()
  username: string;

  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
    }
  )
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsIn(['student', 'teacher'])
  role: 'student' | 'teacher';

  @IsUrl()
  picture: string;
}

export class LoginDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
