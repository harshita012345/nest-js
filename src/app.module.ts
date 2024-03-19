import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
// import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(
    //   'mongodb://localhost:27017/mongo?authSource=admin',
    //   // 'mongodb://127.0.0.1:27017/demo-nest',
    // ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    DatabaseModule,
    // PrismaModule,
  ],
})
export class AppModule {}
