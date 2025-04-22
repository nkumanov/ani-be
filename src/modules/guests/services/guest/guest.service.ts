import { AttendeeDocument } from '@app/db/schemas/Attendee.schema';
import { GuestsServiceDb } from '@app/db/services/guests.service';
import { INewGuest } from '@app/shared/models/guest.model';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class GuestService {
  constructor(private readonly _guestsServiceDb: GuestsServiceDb) {}

  async getAllGuests(): Promise<AttendeeDocument[]> {
    try {
      const guests = await this._guestsServiceDb.getGuests();
      if (!guests) {
        throw new BadRequestException('Something went wrong');
      }
      return guests;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createNewGuests(guestData: INewGuest): Promise<AttendeeDocument> {
    try {
      console.log(guestData);
      const newGuest = await this._guestsServiceDb.createNewGuest(guestData);
      console.log(newGuest);
      if (!newGuest) {
        throw new BadRequestException(
          'Failed to create new guest. Please try again.',
        );
      }

      return newGuest;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
