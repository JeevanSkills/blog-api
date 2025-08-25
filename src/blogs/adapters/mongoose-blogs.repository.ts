import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog as BlogEntity } from '../domain/blog.entity';
import { BlogsRepository } from '../domain/blogs.repository';
import {
  Blog as BlogSchema,
  BlogDocument,
} from '../schemas/blogs.schema';
import { CreateBlogDto } from '../dtos/create-blog.dto';

@Injectable()
export class MongooseBlogsRepository implements BlogsRepository {
  constructor(
    @InjectModel(BlogSchema.name)
    private readonly blogModel: Model<BlogDocument>,
  ) {}

  async findAll(): Promise<BlogEntity[]> {
    const blogDocuments = await this.blogModel.find().exec();
    return blogDocuments.map((doc) => this.toDomain(doc));
  }

  async create(createBlogDto: CreateBlogDto): Promise<BlogEntity> {
    const newBlog = new this.blogModel(createBlogDto);
    const savedDoc = await newBlog.save();
    return this.toDomain(savedDoc);
  }

  private toDomain(blogDocument: BlogDocument): BlogEntity {
    return Object.assign(new BlogEntity(), {
      id: blogDocument._id.toString(),
      title: blogDocument.title,
      content: blogDocument.content,
      author: blogDocument.userId,
    });
  }
}

