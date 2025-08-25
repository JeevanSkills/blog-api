import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blogs.schema';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private blogModel) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }
}
