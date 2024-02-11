import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ILogger } from "../../logger/service/logger.interface";
import "reflect-metadata";
import { IExampleController } from "./example.controller.interface";
import { IExampleService } from "../service/example.service.interface";
import { ExampleLoginDto } from "../dto/example-login.dto";
import { ExampleRegisterDto } from "../dto/example-register.dto";
import { HttpError } from "../../errors/http-error.class";
import { IConfigService } from "../../config/service/config.service.interface";


@injectable()
export class ExampleController extends BaseController implements IExampleController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ExampleService) private userService: IExampleService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/example/register",
        method: "post",
        func: this.register,
        middlewares: [],
      },
      {
        path: "/example/login",
        method: "post",
        func: this.login,
        middlewares: [],
      },
    ]);
  }

  async login(
    { body }: Request<{}, {}, ExampleLoginDto>,
    res: Response,
    next: NextFunction
  ) {
    const validate = await this.userService.validateUser(body);
    if (!validate) {
      return next(new HttpError(401, "Ошибка авторизации", "login"));
    }
    this.ok(res, { validate });
  }



  async register(
    { body }: Request<{}, {}, ExampleRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HttpError(422, "Пользователь уже существует"));
    }
    this.ok(res, { email: result.email, id: result.id });
  }
}