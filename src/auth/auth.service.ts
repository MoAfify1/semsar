import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payloadDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  sign(payload: payloadDto) {
    const accesstoken = this.jwt.sign(payload);
    return { accesstoken };
  }
}
