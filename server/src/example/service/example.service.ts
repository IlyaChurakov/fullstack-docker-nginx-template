import { inject, injectable } from "inversify";
import { ExampleLoginDto } from "../dto/example-login.dto";
import { ExampleRegisterDto } from "../dto/example-register.dto";
import { Example } from "../entity/example.entity";
import { IExampleService } from "./example.service.interface";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/service/config.service.interface";
import { IExampleRepository } from "../repository/example.repository.interface";


@injectable()
export class ExampleService implements IExampleService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ExampleRepository) private usersRepository: IExampleRepository
  ) {}
  async createUser({
    email,
    name,
    password,
  }: ExampleRegisterDto): Promise<any | null> {
    const newUser = new Example(email, name);
    const salt = this.configService.get("SALT");
    await newUser.setPassword(password, Number(salt));
    const existedUser = await this.usersRepository.find(email);

    if (existedUser) {
      return null;
    }

    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: ExampleLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);

    if (!existedUser) {
      return false;
    }

    const newUser = new Example(
      existedUser.email,
      existedUser.name,
      existedUser.password
    );

    return newUser.comparePassword(password);
  }
}