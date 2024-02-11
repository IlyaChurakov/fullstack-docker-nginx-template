import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types";
import App from "./app";

/// EXAMPLE CODE INF (start)
import { IExampleService } from "./example/service/example.service.interface"; // Интерфрейс
import { ExampleService} from "./example/service/example.service"; // Модуль

import { IExampleRepository } from "./example/repository/example.repository.interface";
import { ExampleRepository } from "./example/repository/example.repository";

import { ExampleController } from "./example/controller/example.controller";
import { IExampleController } from "./example/controller/example.controller.interface";
/// EXAMPLE CODE INF (end)

import { IConfigService } from "./config/service/config.service.interface";
import { ConfigService } from "./config/service/config.service";
import { PrismaService } from "./database/service/prisma.service";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/service/logger.service";
import { ILogger } from "./logger/service/logger.interface";
import { IExeptionFilter } from "./errors/exeprion.filter.interface";


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  /// EXAMPLE CODE INF (start)
  bind<IExampleRepository>(TYPES.ExampleRepository).to(ExampleRepository).inSingletonScope(),
  bind<IExampleController>(TYPES.ExampleController).to(ExampleController).inSingletonScope();
  bind<IExampleService>(TYPES.ExampleService).to(ExampleService).inSingletonScope();
  /// EXAMPLE CODE INF (start)


  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope(); 
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
  bind<App>(TYPES.Application).to(App).inSingletonScope();
});