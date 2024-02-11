import { Example } from "../entity/example.entity";


export interface IExampleRepository {
  create: (user: Example) => Promise<any>;
  find: (email: string) => Promise<any | null>;
}