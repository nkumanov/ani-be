import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/User.schema';
import { UserServiceDb } from './services/user.service';
import { GuestsServiceDb } from './services/guests.service';
import { Attendee, AttendeeSchema } from './schemas/Attendee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
  ],
  providers: [UserServiceDb, GuestsServiceDb],
  exports: [UserServiceDb, GuestsServiceDb],
})
export class DbModule {}
