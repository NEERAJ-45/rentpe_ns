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
      ...(config.nodeENV !== "production" && { stack: this.stack }),
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


interface CustomError extends Error {
  statuscode?: number;
  status?: string;
  stack?: string;
}

export const GlobalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuscode = error.statuscode || 500;
  const message = error.message || "Something went wrong";
  const stack = error.stack;

  res.status(statuscode).json({
    status: statuscode,
    message,
    ...(config.nodeENV !== "production" && { stack }),
  });
};

