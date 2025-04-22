import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth-controller/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { DbModule } from '@app/db/db.module';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [DbModule, SharedModule]
})
export class AuthModule {}
