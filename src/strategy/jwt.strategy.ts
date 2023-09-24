import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/schemas/user.schema";
import { jwtConstants } from '../auth/constant'; // Đảm bảo đường dẫn đúng địa chỉ

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.SECRET,
    });
}

  async validate(payload) {
  
    
    const user = await this.userModel.findById(payload.id);
    console.log(payload.id);
    console.log(user);
    
    if (!user) {
      throw new UnauthorizedException("Please login to access this endpoint!");
    }

    return user;
  }
}
