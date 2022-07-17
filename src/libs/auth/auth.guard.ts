import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JWTVerify } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
 
    if (!authorization) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    let verifyToken = await JWTVerify(authorization)
    if(!verifyToken){
      throw new HttpException('Token Jwt Failed', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}