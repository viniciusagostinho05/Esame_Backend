import { HydratedDocument, model, Schema } from "mongoose"
import { Assignment, AssignmentStudent } from "./assignment.entity"


const studentProgressSchema = new Schema<AssignmentStudent>({
    studentId: { type: Schema.Types.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false}
}, { _id: false }); // evita che mongo dia un id inutile ad ogni riga del folgio firme

const assignmentSchema = new Schema<Assignment>({
    title: String,
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom'},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    students: [studentProgressSchema]
}, { timestamps: true}); // crea da solo createdAt 

assignmentSchema.virtual('studentsCount').get(function(this: Assignment){
    return this.students.length;
})

assignmentSchema.virtual('completedCount').get(function(this: Assignment){
    return this.students.filter(student => student.completed).length;
})

assignmentSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.students;
        delete ret.classroom;
        return ret;
    }
})

export type AssignmentDocument = HydratedDocument<Assignment>

export const AssignmentModel = model<Assignment>('Assignment', assignmentSchema);