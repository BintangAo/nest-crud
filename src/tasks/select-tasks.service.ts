import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { SelectTasks, SelectUsers, tasksTable, usersTable } from 'src/schema';

@Injectable()
export class SelectTaskService {
  async getOneTask(
    id: SelectTasks['id'],
    userToken: SelectUsers['token'],
  ): Promise<SelectTasks> {
    try {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.token, userToken),
        with: {
          tasks: {
            where: eq(tasksTable.id, id),
          },
        },
      });
      if (!user.tasks[0]) {
        throw new NotFoundException();
      } else {
        return user.tasks[0];
      }
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
  async getAllTasks(userToken: SelectUsers['token']): Promise<SelectTasks[]> {
    try {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.token, userToken),
        with: {
          tasks: true,
        },
      });
      return user.tasks;
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
}
