import { IsEmpty } from "@nestjs/class-validator";
import { User } from "src/schemas/user.schema";
import { createCommentDto } from "./create-comment.";

export class updateBlogDto{

    readonly title: string;
    readonly content: string;
    readonly postDate: Date
    // readonly _id: string;
    @IsEmpty({ message: "Can not pass userId"})
    readonly user: User ;
    comments: createCommentDto[]

}