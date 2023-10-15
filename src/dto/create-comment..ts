import { Blog } from "src/schemas/blog.schema";
import { User } from "../schemas/user.schema";
import { IsNotEmpty, IsEmpty,MinLength, IsString } from "@nestjs/class-validator";
export class createCommentDto{

    @IsNotEmpty({message: "Text is not empty"})
    readonly text: string;

       @IsNotEmpty({message: "User is not empty"}) 
    readonly user: string;
}
