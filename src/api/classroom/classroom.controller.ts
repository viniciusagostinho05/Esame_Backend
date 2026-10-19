import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { CreateClassroomDto } from "./classroom.dto";
import classroomSrv from "./classroom.service";

export const add = async (
  req: TypedRequest<CreateClassroomDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, students } = req.body;
    const teacherId = (req.user as any).id;

    const created = await classroomSrv.add({
      name,
      students: students as any,
      createdBy: teacherId
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const classrooms = user.role === 'teacher'
      ? await classroomSrv.findByTeacher(user.id)
      : await classroomSrv.findByStudent(user.id);

    res.json(classrooms);
  } catch (err) {
    next(err);
  }
};