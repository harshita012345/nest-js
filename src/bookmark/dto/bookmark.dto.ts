import { IsNotEmpty } from 'class-validator';

export class BookmarkDto {
  @IsNotEmpty()
  title: string;
}
