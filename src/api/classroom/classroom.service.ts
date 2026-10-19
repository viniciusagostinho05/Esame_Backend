import { Types } from "mongoose";
import { Classroom } from "./classroom.entity";
import { ClassroomModel } from "./classroom.model";

export class ClassroomService {

  async add(data: Omit<Classroom, 'id'>): Promise<Classroom> {
    const newClassroom = await ClassroomModel.create(data);
    return newClassroom.populate('createdBy');
  }

  async findByTeacher(teacherId: string): Promise<Classroom[]> {
    return ClassroomModel.find({ createdBy: teacherId }).populate('createdBy');
  }

  async findByStudent(studentId: string): Promise<Classroom[]> {
    return ClassroomModel
      .find({ students: new Types.ObjectId(studentId) })
      .populate('createdBy');
  }


  async getById(id: string): Promise <Classroom | null>{
    return ClassroomModel.findById(id);
  }
}

export default new ClassroomService();