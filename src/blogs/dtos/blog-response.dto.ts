import { Exclude, Expose } from 'class-transformer';
import { Blog } from '../schemas/blogs.schema';

// This DTO defines the structure of a single blog post in the API response.
// It uses class-transformer decorators to control which fields are exposed.
export class BlogResponseDto {
  @Expose()
  _id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  image: string;

  // Exclude userId from the response by default
  @Exclude()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<Blog>) {
    Object.assign(this, partial);
  }
}
