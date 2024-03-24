import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'main-db',
    ),
    ConfigModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
