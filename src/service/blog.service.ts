import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Blog } from '../schemas/blog.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/schemas/comment.schema';
import { createCommentDto } from 'src/dto/create-comment.';
@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name)
        private blogModel: mongoose.Model<Blog>,
        @InjectModel(Comment.name)
        private commentModel: mongoose.Model<Comment>

    ) { }
    async findAll(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }

    async create(blog: Blog, user: User): Promise<Blog> {
        const blogData = new this.blogModel({
            title: blog.title,
            content: blog.content,
            user: user._id, // Assign the user to the blog
        });
        const createdBlog = await blogData.save();

        if (blog.comments && blog.comments.length > 0) {
            const commentPromises = blog.comments.map(async (commentData) => {
                const comment = new this.commentModel({
                    text: commentData.text,
                    user: user._id, // Assign the user to the comment
                });
                return await comment.save();
            });

            const createdComments = await Promise.all(commentPromises);

            createdBlog.comments = createdComments; // Assign the actual Comment objects
            await createdBlog.save();
        }

        return createdBlog;
    }

    async findbyId(id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id);

        if (!blog) {
            throw new NotFoundException("Not found blog!")
        }
        return blog
    }
    async updateBlog(id: string, blog: Blog): Promise<Blog> {
        return await this.blogModel.findByIdAndUpdate(id, blog, {
            new: true, 
            runValidators: false
        });

    }

    async deleteBlog(id: string): Promise<Blog> {
        return await this.blogModel.findByIdAndDelete(id);

    }
    async deleteBlogAll(){
        return await this.blogModel.deleteMany({}).exec();

    }
    async createComment(blogId: string, commentData: createCommentDto): Promise<Comment> {
        const blog = await this.blogModel.findById(blogId).exec();
        if (!blog) {
            throw new Error('Blog not found');
        }

        const comment = new this.commentModel({
            text: commentData.text,
            user: commentData.user,
        });

        blog.comments.push(comment);
        await blog.save();

        return comment;
    }

    async getComment(id: string): Promise<Blog> {
        const comment = await this.blogModel.findById(id);

        if (!comment) {
            throw new NotFoundException("Not found comment!")
        }
        return comment
    }
}
