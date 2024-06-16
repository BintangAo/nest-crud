import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterService, UserBody } from './register/register.service';
import { LoginService } from './login/login.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly register: RegisterService,
    private readonly login: LoginService,
  ) {}
  @Get()
  userCookie(@Req() req: Request) {
    const { userToken } = req.signedCookies as { userToken: string };
    console.log(userToken);
  }
  @Post('register')
  async userRegister(@Body() body: UserBody, @Res() res: Response) {
    const user = await this.register.registerUser(body);
    res.cookie('user-token', user.token, { signed: true }).json({
      message: 'Success on registering user',
    });
  }
  @Get('login')
  async userLogin(@Body() body: UserBody, @Res() res: Response) {
    const user = await this.login.userLogin(body);
    res.cookie('user-token', user.token, { signed: true }).json({
      message: 'Success on login',
    });
  }
}
