import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/schemas/user.schema";
import { jwtConstants } from '../auth/constant'; // Đảm bảo đường dẫn đúng địa chỉ

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
      ignoreExpiration: false,
      secretOrKey: `${process.env.SECRET}`, 
    });
}

  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException("Please login to access this endpoint!");
    }

    return user;
  }
}
