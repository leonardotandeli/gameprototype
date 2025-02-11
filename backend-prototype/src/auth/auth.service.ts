import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User, { UserDocument } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user.nickName, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
