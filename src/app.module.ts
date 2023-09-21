import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://baonhat20:yA9A5NWVMvqmciHd@cluster0.lvvvjmp.mongodb.net/?retryWrites=true&w=majority' ),BlogModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
