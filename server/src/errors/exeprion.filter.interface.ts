import { Response, Request, NextFunction } from "express";

export interface IExeptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}