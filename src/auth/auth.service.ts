import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModal: Model<Auth>) {}

  async signUp(dto: AuthDto) {
    try {
      // Generate password
      const hash = await argon.hash(dto.password);

      const findUser = await this.authModal.findOne({
        email: dto.email,
      });

      if (findUser) return { message: 'User already exist!' };

      // save the new user in db
      const user = await this.authModal.create({
        email: dto.email,
        password: hash,
      });

      delete user.password;

      // Return the saved user
      return { message: 'User created successfully', data: user };
    } catch (error) {
      return { message: error.message };
    }
  }

  async signIn(dto: AuthDto) {
    try {
      const findUser = await this.authModal.findOne({
        email: dto.email,
      });

      if (!findUser) return { message: 'User not exist!' };

      // verify password
      const matchPass = await argon.verify(findUser?.password, dto.password);
      if (!matchPass) return { message: 'Password not matched!' };

      delete findUser?.password;
      return { data: findUser, message: 'Login successfully!' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async getUser() {
    try {
      const response = await this.authModal.find({});
      return { data: response };
    } catch (error) {
      return { message: error.message };
    }
  }
}
