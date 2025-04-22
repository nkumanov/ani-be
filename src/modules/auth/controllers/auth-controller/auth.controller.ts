import { Jwt } from '@app/shared/services/jwt/jwt.service';
import {
  IUserCreateDto,
  IUserSignInDto,
} from '@app/shared/services/models/user.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import { IsGuestGuard } from '@app/guards/isGuest.guard';
@Controller('user/auth')
export class AuthController {
  constructor(
    private readonly _authUserService: AuthService,
    private readonly _jwtService: Jwt,
  ) {}
  @Post('/signup')
  @UseGuards(IsGuestGuard)
  async registerNewUser(
    @Res() response: Response,
    @Body() body: IUserCreateDto,
  ): Promise<void> {
    try {
      const registeredUser = await this._authUserService.signUp(body);
      if (registeredUser) {
        const token = await this._jwtService.generateToken({
          username: registeredUser.username,
          userId: registeredUser._id.toString(),
        });
        response.send({
          data: {
            token: token,
            username: registeredUser.username,
            userId: registeredUser._id.toString(),
          },
        });
      }
    } catch (err) {
      console.log(err);
      response.send(err);
    }

    response.send();
  }
  @Post('signin')
  @UseGuards(IsGuestGuard)
  async signin(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: IUserSignInDto,
  ): Promise<void> {
    try {
      const existingUser = await this._authUserService.signIn(body);
      if (existingUser) {
        const token = await this._jwtService.generateToken({
          username: existingUser.username,
          userId: existingUser._id.toString(),
        });
        response.send({
          data: {
            token: token,
            username: existingUser.username,
            userId: existingUser._id.toString(),
          },
          error: null,
        });
      }
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({
        data: null,
        error: error,
      });
    }
  }
}
