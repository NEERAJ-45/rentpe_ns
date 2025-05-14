import { Request, Response, NextFunction } from "express";
import { ZodIssue } from "zod";
import config from "../config/env";

export class ApiError extends Error {
  statuscode: number;
  error: string | string[] | ZodIssue[];
  stack?: string;
  success: boolean;
  status: string;
  data: any;

  constructor(
    statuscode: number,
    message: string = 'Something went wrong',
    error: string | string[] | ZodIssue[] = 'Unknown error',
    data: any = null,
  ) {
    super(message);
    this.statuscode = statuscode;
    this.success = false;
    this.status = statuscode >= 400 && statuscode < 500 ? 'fail' : 'error';
    this.error = error;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statuscode,
      message: this.message,
      error: this.error,
      status: this.status,
      data: this.data,
    };
  }
}



export class ApiResponse<T>{
  message: string;
  statuscode: number;
  data: T | null;

  constructor(statuscode: number, data: T | null, message: string = ''){
    this.statuscode = statuscode,
    this.data = data,
    this.message = message;
  }
}


export const GlobalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if(error instanceof ApiError){
    if(config.nodeENV !== 'production'){
      console.error(error.stack);
    }
  
    res.status(error.statuscode).json(error.toJSON());
  }

  const statuscode = 500;
  const message = "Something went wrong";
  const stack = error.stack;

  if(config.nodeENV !== 'production'){
    console.error(error.message);
    console.error(stack);
  }

  res.status(statuscode).json(new ApiError(statuscode, message, message, null))
};

