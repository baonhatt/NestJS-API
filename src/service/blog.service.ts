import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Blog } from '../schemas/blog.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name)
        private blogModel: mongoose.Model<Blog>
    ) { }
    async findAll(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }

    async create(blog: Blog, user: User): Promise<Blog> {


        const data = Object.assign(blog, { user: user._id})
        const res = await this.blogModel.create(data);
        return res
    }
    async findbyId(id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id);

        if(!blog){
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
}
