import { MinLength } from "@nestjs/class-validator";
import { User } from "../schemas/user.schema";
import { IsNotEmpty, IsEmpty } from 'class-validator';
export class createBlogDto{


    @MinLength(3)
    readonly title: string;

    
    @IsNotEmpty({message: "Content is not empty"})
    readonly content: string;

    
    readonly postDate: Date

    @IsEmpty({ message: "Can not pass userId"})
    readonly user: User ;
}
