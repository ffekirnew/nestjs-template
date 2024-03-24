import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'main-db') private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = { ...createUserDto, salt: await bcrypt.genSalt() };
    user.password = await bcrypt.hash(user.password, user.salt);

    return await this.userModel.create(user);
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async checkPassword(givenPassword: string, user: User): Promise<boolean> {
    return await bcrypt.compare(givenPassword, user.password);
  }
}
