import { IsEmail, IsString } from "class-validator";

export class ExampleLoginDto {
  @IsEmail({}, { message: "Неверно указан email" })
  email: string;
  @IsString({ message: "Не указан пароль" })
  password: string;
}