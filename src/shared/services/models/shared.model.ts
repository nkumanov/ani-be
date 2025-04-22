import { Request } from 'express';

export interface IModifiedRequest extends Request {
  userData: {
    email: string;
    userId: string;
  };
}

export interface IResponse {
  body: {
    data: any;
  };
  error: string;
}
