import express, { Express } from "express";
import { Server } from "node:http";
import { inject, injectable } from "inversify";
import { ILogger } from "./logger/service/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeprion.filter.interface";
import { json } from "body-parser";
import "reflect-metadata";
import { PrismaService } from "./database/service/prisma.service";
import { IConfigService } from "./config/service/config.service.interface";
import { ExampleController } from "./example/controller/example.controller";
import { RequestMiddleware } from "./middleware/requestLog.middleware";
import cors from "cors";
 
@injectable()
class App {
  private app: Express;
  private server: Server;
  private port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ExampleController) private usersController: ExampleController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  useMiddleware() {
    const requestMiddleware = new RequestMiddleware(this.logger);
    const corsOptions = {
      origin:  "*",
      methods: ["GET", "POST"],
      credential: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(json());
    this.app.use(requestMiddleware.execute.bind(requestMiddleware));


  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server start on port: ${this.port} 123`);
    });
  }
}

export default App;