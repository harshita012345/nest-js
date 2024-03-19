import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { Bookmark, BookmarkSchema } from './bookmark.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
