import { Module } from '@nestjs/common';

import { DbModule } from '@app/db/db.module';
import { SharedModule } from '@app/shared/shared.module';
import { GuestController } from './controllers/guest/guest.controller';
import { GuestService } from './services/guest/guest.service';

@Module({
  controllers: [GuestController],
  providers: [GuestService],
  imports: [DbModule, SharedModule],
})
export class GuestModule {}
