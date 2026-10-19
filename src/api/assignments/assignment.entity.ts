import { Types } from "mongoose";

export interface AssignmentStudent {
    studentId: Types.ObjectId;
    completed: boolean;
}

export interface Assignment {
    id: string,
    title: string,
    classroom: Types.ObjectId | string,
    createdBy: Types.ObjectId | string,
    students: AssignmentStudent[];
}