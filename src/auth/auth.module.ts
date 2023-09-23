import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constant';
import { refreshJwtStrategy } from 'src/strategy/resfresh.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
