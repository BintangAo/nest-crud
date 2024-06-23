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
  fakeCookies(@Res() res: Response) {
    res.cookie('user-token', 'a', { signed: true }).json({ ok: 'ok' });
  }
  @Post('register')
  async userRegister(
    @Body() body: UserBody,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (req.signedCookies['user-token']) {
      return res.redirect('/');
    }
    const user = await this.register.registerUser(body);
    res.cookie('user-token', user.token, { signed: true }).json({
      message: 'Success on registering user',
    });
  }
  @Get('login')
  async userLogin(
    @Body() body: UserBody,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (req.signedCookies['user-token']) {
      return res.redirect('/');
    }
    const user = await this.login.userLogin(body);
    res.cookie('user-token', user.token, { signed: true }).json({
      message: 'Success on login',
    });
  }
}
