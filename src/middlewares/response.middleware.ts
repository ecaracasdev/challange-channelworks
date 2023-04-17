import { Request, Response, NextFunction } from 'express';

interface SuccessResponse {
  status: 'success';
  data: any;
}

interface ErrorResponse {
  status: 'error';
  message: string;
  code: string;
}

interface ResponseMethods {
  success: (data: any) => void;
  error: (message: string, code: string) => void;
}

export function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const responseMethods: ResponseMethods = {
    success: (data: any) => {
      const responseData: SuccessResponse = {
        status: 'success',
        data: data,
      };
      res.json(responseData);
    },
    error: (message: string, code: string) => {
      const responseData: ErrorResponse = {
        status: 'error',
        message: message,
        code: code,
      };
      res.status(400).json(responseData);
    },
  };
  res.locals.responseMethods = responseMethods;
  next();
}
