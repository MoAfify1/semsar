import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  forwardRef,
  HttpException,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService)) private UsersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'hel0lo',
    });
  }

  async validate(payload: any) {
    const user = await this.UsersService.findOne(payload.id);
    if (!user) {
      throw new HttpException('UnAuthrized', HttpStatus.UNAUTHORIZED);
    }
    if (user.lock == true) {
      throw new HttpException('User is Unlocked', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
