import { IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class CreateAssignment{
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class ClassroomParams{
    @IsMongoId()
    classroomId: string;
}

export class AssignmentParams {
    @IsMongoId()
    classroomId: string;

    @IsMongoId()
    id: string
}