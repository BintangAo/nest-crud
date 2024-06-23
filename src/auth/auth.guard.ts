import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from 'src/db';
import { usersTable } from 'src/schema';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const token = req.signedCookies as Record<any, string>;
    if (!token['user-token']) {
      return false;
    }
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.token, token['user-token']));
    if (!user[0]) {
      res.clearCookie('user-token');
      return false;
    } else {
      return true;
    }
  }
}
