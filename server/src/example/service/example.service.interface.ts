import { ExampleRegisterDto } from "../dto/example-register.dto";
import { ExampleLoginDto } from "../dto/example-login.dto";


export interface IExampleService {
  createUser: (dto: ExampleRegisterDto) => Promise<any | null>;
  validateUser: (dto: ExampleLoginDto) => Promise<boolean>;
}