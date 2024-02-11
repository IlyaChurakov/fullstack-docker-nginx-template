import { Request, Response, NextFunction, Router } from "express";
import { IMiddlewares } from "./middlewares.interface";

export type Method = "get" | "post" | "delete" | "put" | "patch";

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, Method>;
  middlewares?: IMiddlewares[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;