import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blogs.schema';
import { BlogsRepository } from './domain/blogs.repository';
import { MongooseBlogsRepository } from './adapters/mongoose-blogs.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    { provide: BlogsRepository, useClass: MongooseBlogsRepository },
  ],
})
export class BlogsModule {}
