import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";


export class registerDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;
    
    @IsString()
    readonly _id: string;

    @IsNotEmpty()
    @IsEmail( {}, {message: 'Please correct email'})
    readonly email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string; 

}
