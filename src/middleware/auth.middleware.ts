import { Jwt } from '@app/shared/services/jwt/jwt.service';
import { IModifiedRequest } from '@app/shared/services/models/shared.model';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private _jwt: Jwt) {}
  async use(req: IModifiedRequest, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const userToken = req.headers['authorization'];

      try {
        const decodedToken = await this._jwt.verifyToken(userToken);
        if (decodedToken) {
          req.userData = decodedToken;
        }
      } catch (error) {
        console.log(error);
      }
    }
    next();
  }
}
