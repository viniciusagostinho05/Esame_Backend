import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { NotFoundError } from "../../errors/not-found.error";
import { AssignmentParams, ClassroomParams, CreateAssignment } from "./assignment.dto";
import { AssignmentDocument } from "./assignment.model";
import assignmentSrv from "./assignment.service";
import classroomSrv from "../classroom/classroom.service";

// aggiunge "completed" solo per gli studenti
const toResponse = (assignment: AssignmentDocument, user: any) => {
  const json: any = assignment.toJSON();
  if (user.role === 'student') {
    const mine = assignment.students.find(s => s.studentId.toString() === user.id);
    json.completed = mine?.completed ?? false;
  }
  return json;
};

export const add = async (
  req: TypedRequest<CreateAssignment, unknown, ClassroomParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classroomId } = req.params;
    const user = req.user as any;

    const classroom = await classroomSrv.getById(classroomId);
    if (!classroom || classroom.createdBy.toString() !== user.id) {
      throw new NotFoundError();
    }

    const created = await assignmentSrv.add({
      title: req.body.title,
      classroom: classroomId,
      createdBy: user.id,
      students: classroom.students.map(studentId => ({
        studentId,
        completed: false
      }))
    });

    res.status(201).json(toResponse(created, user));
  } catch (err) {
    next(err);
  }
};

export const list = async (
  req: TypedRequest<unknown, unknown, ClassroomParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classroomId } = req.params;
    const user = req.user as any;

    const classroom = await classroomSrv.getById(classroomId);
    if (!classroom) {
      throw new NotFoundError();
    }

    const allowed = user.role === 'teacher'
      ? classroom.createdBy.toString() === user.id
      : classroom.students.some(s => s.toString() === user.id);

    if (!allowed) {
      throw new NotFoundError();
    }

    const assignments = await assignmentSrv.findByClassroom(classroomId);
    res.json(assignments.map(a => toResponse(a, user)));
  } catch (err) {
    next(err);
  }
};

export const complete = async (
  req: TypedRequest<unknown, unknown, AssignmentParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classroomId, id } = req.params;
    const user = req.user as any;

    const assignment = await assignmentSrv.getById(id);
    if (!assignment || assignment.classroom.toString() !== classroomId) {
      throw new NotFoundError();
    }

    const mine = assignment.students.find(s => s.studentId.toString() === user.id);
    if (!mine) {
      throw new NotFoundError();
    }

    if (mine.completed) {
      res.status(400).json({
        error: 'AlreadyCompleted',
        message: 'Attività già completata'
      });
      return;
    }

    mine.completed = true;
    await assignment.save();

    res.json(toResponse(assignment, user));
  } catch (err) {
    next(err);
  }
};