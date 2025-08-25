import { Blog } from './blog.entity';
import { CreateBlogDto } from '../dtos/create-blog.dto';

export abstract class BlogsRepository {
  abstract findAll(): Promise<Blog[]>;
  abstract create(blogDto: CreateBlogDto): Promise<Blog>;
}

