import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    postDate: {type: Date, require: true}
})