import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/schemas/user.schema';
import { UsersService } from 'src/modules/users/users.service';
import { SignUpDto } from './dtos/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getByUsername(username);

    if (user && this.usersService.checkPassword(password, user)) {
      user.password = undefined;
      user.salt = undefined;
      return user;
    }

    return null;
  }

  async login(user: User) {
    const accessToken = await this.signJwt(user.firstName, user.username);

    return {
      user,
      accessToken,
    };
  }

  async signUp(user: SignUpDto) {
    const createdUser = await this.usersService.create(user);
    return this.login(createdUser);
  }

  async signJwt(firstName: string, username: string) {
    const payload = {
      sub: firstName,
      username: username,
      iat: new Date().getTime(),
      superuser: true,
    };
    return await this.jwtService.signAsync(payload);
  }
}
