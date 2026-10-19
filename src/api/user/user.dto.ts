import { IsIn } from "class-validator";

export class ListUsersDto {
  @IsIn(['student', 'teacher'])
  type: 'student' | 'teacher';
}