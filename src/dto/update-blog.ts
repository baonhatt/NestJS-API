import { IsEmpty } from "@nestjs/class-validator";
import { User } from "src/schemas/user.schema";

export class updateBlogDto{

    readonly title: string;
    readonly content: string;
    readonly postDate: Date
    @IsEmpty({ message: "Can not pass userId"})
    readonly user: User ;
}