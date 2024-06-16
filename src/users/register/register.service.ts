import { ConflictException, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { usersTable } from 'src/schema';
import * as crypto from 'crypto';

export type UserBody = {
  username: string;
  password: string;
};
@Injectable()
export class RegisterService {
  async registerUser(res: UserBody) {
    if (
      await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, res.username))[0]
    ) {
      throw new ConflictException('Username already taken by someone');
    } else {
      const token = crypto.randomBytes(64).toString('hex');
      const salt = crypto.randomBytes(16).toString('base64');
      const hashedPassword = crypto
        .pbkdf2Sync(res.password, salt, 100, 64, 'sha512')
        .toString('base64');
      const user = await db
        .insert(usersTable)
        .values({
          username: res.username,
          password: hashedPassword,
          token,
          salt,
        })
        .returning();
      return user[0];
    }
  }
}
