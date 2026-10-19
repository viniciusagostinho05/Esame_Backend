import { validationHandler } from './validation-error';
import { genericErrorHandler } from "./generic.error";
import { notFoundHandler } from "./not-found.error";

export const errorHandlers = [validationHandler, notFoundHandler, genericErrorHandler];
