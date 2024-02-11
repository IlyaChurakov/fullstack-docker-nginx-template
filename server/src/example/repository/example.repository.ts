import { Example } from "../entity/example.entity";
import { IExampleRepository } from "./example.repository.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { PrismaService } from "../../database/service/prisma.service";

@injectable()
export class ExampleRepository implements IExampleRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}
  async create({ email, password, name }: Example): Promise<any> {
    return null;
    // return this.prismaService.client.userModel.create({
    //   data: {
    //     email,
    //     password,
    //     name,
    //   },
    // });
  }

  async find(email: string): Promise<any | null> {
    return null;
    // return this.prismaService.client.userModel.findFirst({
    //   where: {
    //     email,
    //   },
    // });
  }
}