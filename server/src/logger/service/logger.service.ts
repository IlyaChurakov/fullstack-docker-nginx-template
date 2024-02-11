import { Logger, ILogObj, ISettingsParam } from "tslog";
import { ILogger } from "./logger.interface";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
  logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      type: "pretty",
      prettyLogStyles: {
        logLevelName: {
          "*": ["bold", "black", "bgWhiteBright", "dim"],
          SILLY: ["bold", "white"],
          TRACE: ["bold", "whiteBright"],
          DEBUG: ["bold", "green"],
          INFO: ["bold", "blue"],
          WARN: ["bold", "yellow"],
          ERROR: ["bold", "red"],
          FATAL: ["bold", "redBright"],
        },
        dateIsoStr: "white",
        filePathWithLine: "white",
        name: ["white", "bold"],
        nameWithDelimiterPrefix: ["white", "bold"],
        nameWithDelimiterSuffix: ["white", "bold"],
        errorName: ["bold", "bgRedBright", "whiteBright"],
        fileName: ["yellow"],
      },
    });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    // отправка в sentry
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}