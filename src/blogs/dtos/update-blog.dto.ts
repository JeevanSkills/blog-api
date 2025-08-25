import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsString()
  @IsOptional()
  readonly userId?: string;
}
