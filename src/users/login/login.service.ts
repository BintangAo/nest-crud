import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBody } from '../register/register.service';
import * as crypto from 'crypto';
import { db } from 'src/db';
import { usersTable } from 'src/schema';
import { eq } from 'drizzle-orm';
@Injectable()
export class LoginService {
  async userLogin(res: UserBody) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, res.username));
    if (!user[0]) {
      throw new BadRequestException('Wrong username or password');
    } else {
      const resPasswordHash = crypto
        .pbkdf2Sync(res.password, user[0].salt, 100, 64, 'sha512')
        .toString('base64');
      if (user[0].password !== resPasswordHash) {
        throw new BadRequestException('Wrong username or password');
      } else {
        return user[0];
      }
    }
  }
}
