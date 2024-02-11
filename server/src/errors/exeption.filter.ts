import { Response, Request, NextFunction } from "express";
import { IExeptionFilter } from "./exeprion.filter.interface";
import { HttpError } from "./http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/service/logger.interface";
import { TYPES } from "../types";
import "reflect-metadata";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.logger = logger;
  }

  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HttpError) {
      this.logger.error(
        `[${err.context ?? ""}] Error ${err.statusCode} : ${err.message}`
      );
      res
        .status(err.statusCode)
        .send({ message: err.message, code: err.statusCode });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ message: err.message });
    }
  }
}