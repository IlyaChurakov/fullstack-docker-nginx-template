import { NextFunction, Request, Response } from "express";

export interface IExampleController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  
}