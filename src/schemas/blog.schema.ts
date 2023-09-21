import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

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
}

export const BlogSchema = SchemaFactory.createForClass(Blog);