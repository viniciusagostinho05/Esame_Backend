import { Types } from 'mongoose';

export interface Classroom {
    id: string;
    name: string;
    students: Types.ObjectId[];
    createdBy: Types.ObjectId| string;
}