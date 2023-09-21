import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Blog } from '../schemas/blog.schema';
import { createBlogDto } from 'src/dto/create-blog';
import { updateBlogDto } from 'src/dto/update-blog';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {

    }
    @Get()
    async getAllBlog(): Promise<Blog[]> {
        return this.blogService.findAll();
    }
    @Post()

    async createBlog(

        @Body()
        blog: createBlogDto
    ): Promise<Blog> {
        return this.blogService.create(blog)
    }

    @Get(':id')
    async getBlogDetail(
        @Param('id')
        id: string,
    ): Promise<Blog> {
        
        return this.blogService.findbyId(id);
    }

    @Delete(':id')
    async deleteBlog(
        @Param('id')
        id: string,
    ): Promise<Blog> { 
        
        return this.blogService.deleteBlog(id);
    }
    @Put(':id')
    
    async updateBlog(
        @Param('id')
        id: string,
        @Body()
        blog: updateBlogDto
    ): Promise<Blog> {
        return this.blogService.updateBlog(id, blog);
    }
    
}
