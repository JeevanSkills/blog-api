import { Inject, Injectable } from '@nestjs/common';
import { Blog } from './domain/blog.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { BlogsRepository } from './domain/blogs.repository';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(BlogsRepository)
    private readonly blogsRepository: BlogsRepository,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsRepository.create(createBlogDto);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogsRepository.findAll();
  }
}
