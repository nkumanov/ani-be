import { Module } from '@nestjs/common';
import { Jwt } from './services/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [Jwt],
  exports: [Jwt],
})
export class SharedModule {}
