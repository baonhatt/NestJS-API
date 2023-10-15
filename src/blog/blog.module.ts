import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from '../service/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from '../schemas/blog.schema';
import { AuthModule } from '../auth/auth.module';
import { CommentSchema } from 'src/schemas/comment.schema';
import { UserSchema } from 'src/schemas/user.schema';
@Module({
  imports: [AuthModule, MongooseModule.forFeature([{name: 'Blog', schema: BlogSchema}]),
  MongooseModule.forFeature([{name: 'Comment', schema: CommentSchema}]),
  MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  
],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
 