import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Blog as BlogEntity } from '../domain/blog.entity';
import { BlogsRepository } from '../domain/blogs.repository';
import { Blog as BlogSchema, BlogDocument } from '../schemas/blogs.schema';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';

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

  async findOne(id: string): Promise<BlogEntity | null> {
    const blogDocument = await this.blogModel.findById(id).exec();
    return blogDocument ? this.toDomain(blogDocument) : null;
  }

  async create(createBlogDto: CreateBlogDto): Promise<BlogEntity> {
    const newBlog = new this.blogModel(createBlogDto);
    const savedDoc = await newBlog.save();
    return this.toDomain(savedDoc);
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<BlogEntity | null> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    return updatedBlog ? this.toDomain(updatedBlog) : null;
  }

  async delete(id: string): Promise<BlogEntity | null> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    return deletedBlog ? this.toDomain(deletedBlog) : null;
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
