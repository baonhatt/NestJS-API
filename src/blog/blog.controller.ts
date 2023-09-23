import { Body, Controller, Delete, Get, Param, Post, Put, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Blog } from '../schemas/blog.schema';
import { createBlogDto } from 'src/dto/create-blog';
import { updateBlogDto } from 'src/dto/update-blog';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('/blog')
export class BlogController {
    constructor(private blogService: BlogService) {

    }
    @UseGuards(AuthGuard())
    @Get()
    async getAllBlog(): Promise<Blog[]> {
        return this.blogService.findAll();
    }
    
    
    @Post()
    
    @UseGuards(AuthGuard())
    async createBlog(
        
        @Body()
        blog: createBlogDto,
        @Req() req,
        ): Promise<Blog> {
            
        return this.blogService.create(blog, req.user)
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
