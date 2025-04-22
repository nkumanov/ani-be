import { UserDocument } from '@app/db/schemas/User.schema';
import { UserServiceDb } from '@app/db/services/user.service';
import { IUserCreateDto } from '@app/shared/services/models/user.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly _userServiceDb: UserServiceDb) {}

  async signUp(userDataDto: IUserCreateDto): Promise<UserDocument> {
    try {
      const checkIfExisting = await this._userServiceDb.getUserByUsername(
        userDataDto.username,
      );
      if (checkIfExisting) {
        throw new BadRequestException('This email already exists!');
      }
      if (userDataDto.password !== userDataDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match!');
      }
      delete userDataDto.confirmPassword;
      const newUserToCreate = {
        ...userDataDto,
      };
      const passwordSalts = 10;
      const hashedPassword = await bcrypt.hash(
        userDataDto.password,
        passwordSalts,
      );
      newUserToCreate.password = hashedPassword;
      return this._userServiceDb.createNewUser(newUserToCreate);
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

  async signIn(userData: {
    username: string;
    password: string;
  }): Promise<UserDocument> {
    try {
      const existingUser = await this._userServiceDb.getUserByUsername(
        userData.username,
      );
      if (existingUser) {
        // check password here
        const passowrdMatch = await bcrypt.compare(
          userData.password,
          existingUser.password,
        );
        if (passowrdMatch) {
          return existingUser;
        }
      }
      throw new BadRequestException('Wrong email or password!');
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
