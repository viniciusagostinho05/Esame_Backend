import { Request, Response, NextFunction } from "express";

export const isTeacher = (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
  if ((req.user as any)?.role !== 'teacher') {
    res.status(404);
    res.json({ error: 'NotFound', message: 'Not found' });
    return;
  }
  next();
}

export const isStudent = (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
  if ((req.user as any)?.role !== 'student') {
    res.status(404);
    res.json({ error: 'NotFound', message: 'Not found' });
    return;
  }
  next();
}