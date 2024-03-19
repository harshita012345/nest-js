import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark } from 'src/schemas/bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(@InjectModel(Bookmark.name) private bookModal: Model<Bookmark>) {}

  async createBookmark() {
    try {
      // Return the saved user
      return { message: 'Bookmark created successfully' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
