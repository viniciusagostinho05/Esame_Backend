import { Assignment } from "./assignment.entity";
import { AssignmentDocument, AssignmentModel } from "./assignment.model";

export class AssignmentService{
    async add(data: Omit<Assignment, 'id'>): Promise<AssignmentDocument> {
        const created = await AssignmentModel.create(data);
        
        return created.populate('createdBy');
    }

    async findByClassroom(classroomId: string): Promise<AssignmentDocument[]>{
        return AssignmentModel.find({classroom: classroomId }).populate('createdBy')
    }

    async getById(id: string): Promise<AssignmentDocument | null> {
        return AssignmentModel.findById(id).populate('createdBy');
    }
}

export default new AssignmentService();