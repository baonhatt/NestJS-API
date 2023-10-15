import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Types } from "mongoose";
import { Comment } from "./comment.schema";
@Schema({
    timestamps: true
})

export class Blog{
    @Prop()
    title: string;


    @Prop()
    content: string;

    @Prop()
    postDate: Date;

   
    // @Prop()
    // _id: string;
    
    @Prop()
    comments: Comment[];
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
   
    
}

export const BlogSchema = SchemaFactory.createForClass(Blog);