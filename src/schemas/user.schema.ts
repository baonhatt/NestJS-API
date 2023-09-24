import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectId } from 'mongodb';

@Schema({
    timestamps: true
})

export class User extends Document{
    @Prop({ unique: [true, 'Duplicate email entered']})
    email: string;

    @Prop()
    password: string;

   
    @Prop()
    username: string;

    @Prop()
    name: string;


    @Prop()
    id: ObjectId;

    
}

export const UserSchema = SchemaFactory.createForClass(User);