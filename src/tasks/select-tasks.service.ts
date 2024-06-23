import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { SelectTasks, SelectUsers, usersTable } from 'src/schema';

@Injectable()
export class SelectTaskService {
  async getOneTask(
    taskId: SelectTasks['id'],
    userToken: SelectUsers['token'],
  ): Promise<SelectTasks> {
    const user = await db.query.usersTable
      .findFirst({
        where: eq(usersTable.token, userToken),
        with: {
          tasks: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Failed to fetch to the database',
        );
      });
    if (!user.tasks.some(({ id }) => id === taskId)) {
      throw new NotFoundException();
    } else {
      return user.tasks.find(({ id }) => {
        return id === taskId;
      });
    }
  }
  async getAllTasks(userToken: SelectUsers['token']): Promise<SelectTasks[]> {
    const user = await db.query.usersTable
      .findFirst({
        where: eq(usersTable.token, userToken),
        with: {
          tasks: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Failed to fetch to the database',
        );
      });
    return user.tasks;
  }
}
