import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './service/auth.service';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './auth/constant';
@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    AuthModule,
     JwtModule.register({
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forRoot('mongodb+srv://baonhat20:yA9A5NWVMvqmciHd@cluster0.lvvvjmp.mongodb.net/?retryWrites=true&w=majority'),
     BlogModule ],
  controllers: [AuthController],
  providers: [AppService, AuthService,],
})
export class AppModule { }
