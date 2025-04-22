import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendee, AttendeeDocument } from '../schemas/Attendee.schema';
import { Model } from 'mongoose';
import { INewGuest } from '@app/shared/models/guest.model';

@Injectable()
export class GuestsServiceDb {
  constructor(
    @InjectModel(Attendee.name) private readonly _attendeModel: Model<Attendee>,
  ) {}

  async getGuests(): Promise<AttendeeDocument[]> {
    try {
      const guests = this._attendeModel.find();
      return guests;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewGuest(guest: INewGuest): Promise<AttendeeDocument> {
    try {
      const newGuest = new this._attendeModel(guest);
      return newGuest.save();
    } catch (error) {
      console.log(error);
    }
  }
}
