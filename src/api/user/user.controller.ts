import { NextFunction, Response } from "express";
import { UserModel } from "./user.model";
import { TypedRequest } from "../../utils/typed-request";
import { ListUsersDto } from "./user.dto";

export const list = async (
  req: TypedRequest<unknown, ListUsersDto, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.query;
    const users = await UserModel.find({ role: type });
    res.json(users);
  } catch (err) {
    next(err);
  }
}