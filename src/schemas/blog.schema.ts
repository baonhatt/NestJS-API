import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

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

    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;


}

export const BlogSchema = SchemaFactory.createForClass(Blog);