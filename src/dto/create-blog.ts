import { User } from "../schemas/user.schema";
import { IsNotEmpty, IsEmpty,MinLength, IsString } from "@nestjs/class-validator";
import { createCommentDto } from "./create-comment.";
export class createBlogDto{


    @MinLength(3)
    readonly title: string;

    // readonly _id: string;

    
    @IsNotEmpty({message: "Content is not empty"})
    readonly content: string;

    
    readonly postDate: Date

    @IsEmpty({ message: "Can not pass userId"})
    readonly user: User ;

    comments: createCommentDto[]
}
