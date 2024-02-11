import { inject, injectable } from "inversify";
import { IConfigService } from "./config.service.interface";
import { DotenvConfigOutput, DotenvParseOutput, config } from "dotenv";
import { TYPES } from "../../types";
import { ILogger } from "../../logger/service/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error(`[IConfigService] ${result.error.message}`);
    } else {
      this.logger.log("[IConfigService] Конфигурация .env загружена");
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}