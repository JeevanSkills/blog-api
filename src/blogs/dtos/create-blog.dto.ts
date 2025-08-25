import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
