import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateClassroomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsMongoId({ each: true})
    students: string[];
}