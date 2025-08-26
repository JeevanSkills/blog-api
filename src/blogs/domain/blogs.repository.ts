import { Blog } from './blog.entity';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';

export abstract class BlogsRepository {
  abstract findAll(): Promise<Blog[]>;
  abstract findOne(id: string): Promise<Blog | null>;
  abstract create(blogDto: CreateBlogDto): Promise<Blog>;
  abstract update(id: string, blogDto: UpdateBlogDto): Promise<Blog | null>;
  abstract delete(id: string): Promise<Blog | null>;
}
