

import { IsEmail, IsString } from "class-validator";

export class ExampleRegisterDto {
  @IsEmail({}, { message: "Неверно указан email" })
  email: string;

  @IsString({ message: "Не указан пароль" })
  password: string;

  @IsString({ message: "Не указано имя пользователя" })
  name: string;
}
 