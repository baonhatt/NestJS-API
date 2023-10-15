import { IsString, IsEmail, IsNotEmpty } from "@nestjs/class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}