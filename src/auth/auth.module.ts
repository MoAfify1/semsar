import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './AuthGuard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'hel0lo',
      signOptions: { expiresIn: '10d' },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [PassportModule, AuthService, LocalStrategy],
})
export class AuthModule {}
