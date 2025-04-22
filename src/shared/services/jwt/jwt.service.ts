import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class Jwt {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateToken(userData: {
    username: string;
    userId: string;
  }): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(userData, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return token;
    } catch (error) {
      return error;
    }
  }

  async verifyToken(token: string): Promise<{ email: string; userId: string }> {
    try {
      const userData = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return userData;
    } catch (error) {
      return error;
    }
  }
}
