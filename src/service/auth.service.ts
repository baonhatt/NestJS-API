import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { registerDto } from 'src/dto/register-user';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from 'src/dto/login-user';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {

  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findById(id: string): Promise<User[]> {
    return await this.userModel.findById(id);
  }
  async deleteUser(id: string): Promise<User[]> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async deleteAll() {
    return this.userModel.deleteMany({}).exec();
  }


  async register(registerDto: registerDto): Promise<{ token: string }> {
    const { name, username, password, email } = registerDto;

    // Kiểm tra định dạng email
    if (!registerDto.email.match(/\S+@\S+\.\S+/)) {
      throw new BadRequestException('Email incorrect.');
    }

    // Kiểm tra độ dài mật khẩu
    if (registerDto.password.length < 6) {
      throw new BadRequestException('the password at least 6 characters');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userModel.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      username: registerDto.username,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDTO: loginDTO): Promise<{ token: string, refreshToken: string }> {
    const { email, password } = loginDTO;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Something wrong!");
    }

    const matchedPass = await bcrypt.compare(password, user.password);
    if (!matchedPass) {
      throw new UnauthorizedException("Pass Incorect!");
    }

    const token = this.jwtService.sign({ id: user._id });

    return {
      token,
      refreshToken: this.jwtService.sign(loginDTO, { expiresIn: '3d'})

    }


  }
  async refreshToken(loginDTO: loginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDTO;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Something wrong!");
    }

    const matchedPass = await bcrypt.compare(password, user.password);
    if (!matchedPass) {
      throw new UnauthorizedException("Pass Incorect!");
    }

    const token = this.jwtService.sign({ id: user._id });

    return {
      accessToken: token

    }


  }
}
