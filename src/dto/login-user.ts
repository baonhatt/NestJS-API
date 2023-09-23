import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";


export class loginDTO{

  

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

}
