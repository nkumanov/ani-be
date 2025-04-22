import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/User.schema';

@Injectable()
export class UserServiceDb {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}

  async getUserById(userId: string): Promise<UserDocument> {
    try {
      const user = this._userModel.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    try {
      return await this._userModel.findOne({ username });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByIdAndDelete(userId: string): Promise<UserDocument> {
    try {
      return await this._userModel.findByIdAndDelete(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async createNewUser(userData: any): Promise<UserDocument> {
    try {
      const newUser = new this._userModel(userData);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }
}
