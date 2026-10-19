import { Request } from "express";
import * as core from "express-serve-static-core";

export interface TypedRequest<
  B = any,
  Q = core.Query,
  P = core.ParamsDictionary> extends Request<P, any, B, Q> { }
