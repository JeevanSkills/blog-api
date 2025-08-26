import { Inject, Injectable } from '@nestjs/common';
import { Blog } from './domain/blog.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { BlogsRepository } from './domain/blogs.repository';
import { UpdateBlogDto } from './dtos/update-blog.dto';

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

  async findOne(id: string): Promise<Blog | null> {
    return this.blogsRepository.findOne(id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog | null> {
    return this.blogsRepository.update(id, updateBlogDto);
  }

  async delete(id: string): Promise<Blog | null> {
    return this.blogsRepository.delete(id);
  }
}
