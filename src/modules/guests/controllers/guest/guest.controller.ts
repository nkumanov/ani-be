import {
  EGuestAttend,
  INewCommingGuestDto,
  INewGuest,
  INewNotCommingGuestDto,
} from '@app/shared/models/guest.model';
import { IModifiedRequest } from '@app/shared/services/models/shared.model';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GuestService } from '../../services/guest/guest.service';
@Controller('guests')
export class GuestController {
  constructor(private readonly _guestsService: GuestService) {}
  @Get('/all')
  async getAllGuests(@Res() res: Response) {
    try {
      const guests = await this._guestsService.getAllGuests();

      res.send(guests);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_GATEWAY).send(error);
    }
  }

  @Post('/')
  async createNewGuest(
    @Req() req: IModifiedRequest,
    @Res() res: Response,
    @Body() body: INewCommingGuestDto | INewNotCommingGuestDto,
  ) {
    try {
      if (body.attend === EGuestAttend.ATTEND) {
        const guests = (body as INewCommingGuestDto).guests;
        for (const guest of guests) {
          const newGest: INewGuest = {
            attend: body.attend,
            meal: guest.meal,
            alergy: guest.alergy,
            name: guest.name,
          };
          await this._guestsService.createNewGuests(newGest);
        }
        return res.status(201).json({ message: 'Guests added successfully' });
      } else {
        const guest = body as INewNotCommingGuestDto;
        const newGuestData: INewGuest = {
          name: guest.name,
          attend: guest.attend,
        };
        const newGuest =
          await this._guestsService.createNewGuests(newGuestData);
        if (newGuest) {
          res.send(newGuest);
        }
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
