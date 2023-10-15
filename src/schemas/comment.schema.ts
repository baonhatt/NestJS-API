import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import  * as mongoose from "mongoose";
import { Blog } from "./blog.schema";
import { User } from "./user.schema";
import { Document, Types } from "mongoose";

@Schema({
    timestamps: true
})
export class Comment {
    // @Prop()
    // postDate: Date;
    @Prop({ required: true })
    text: string;

    @Prop() // Tham chiếu đến schema User
    user: string; 



}

export const CommentSchema = SchemaFactory.createForClass(Comment);


