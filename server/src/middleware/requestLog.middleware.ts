import { Request, Response, NextFunction } from "express";
import { IMiddlewares } from "../common/middlewares.interface";
import { ILogger } from "../logger/service/logger.interface";

export class RequestMiddleware implements IMiddlewares {
  constructor(private logger: ILogger) {}

  execute(req: Request, res: Response, next: NextFunction) {
    const { email, url, method, body } = req;
    this.logger.log(`
    User: [${email}] 
    Route: [${url}]
    Method: [${method}]
    Body: [${body}]
    `);
    next();
  }
}