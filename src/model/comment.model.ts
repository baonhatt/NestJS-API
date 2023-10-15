import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    text: {type: String, require: true},
    user: {type: String, require: true},
    postDate: {type: Date, require: true}
});

const CommentModel = mongoose.model('Comment', CommentSchema);