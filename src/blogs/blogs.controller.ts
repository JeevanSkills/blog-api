import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './schemas/blogs.schema';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(createBlogDto);
  }
}
