import { Body, Controller, Post, Get, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { registerDto } from 'src/dto/register-user';
import { loginDTO } from 'src/dto/login-user';
import { User } from 'src/schemas/user.schema';
import { RefreshJwtGuard } from 'src/guard/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post("/register")

  register(@Body() registerDto: registerDto): Promise<{ token: string }> {
    return this.authService.register(registerDto)
  }


  @Post("/login")

  login(@Body() loginDTO: loginDTO): Promise<{ accessToken: string }> {
    return this.authService.login(loginDTO);
  }



  @Get("/all-user")
  getUsers(){
    return this.authService.findAll();
  }
  
  @Get('/user-profile/:id')
  findById( @Param('id') id: string) {
    return this.authService.findById(id);
  }

  @Delete('/delete-all') 
  async deleteAllUsers() {
    await this.authService.deleteAll();
    return { message: 'All users deleted successfully' };
  }
  // @UseGuards(RefreshJwtGuard)
  @Post('/refresh-token')
  async refreshToken(@Request() req) {
    const refreshToken = req.headers.authorization.replace('Bearer ', ''); // Lấy mã token refresh từ tiêu đề
    const newAccessToken = await this.authService.refreshToken(refreshToken);
    return newAccessToken
  }
}
