import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { SelectTasks, SelectUsers, tasksTable, usersTable } from 'src/schema';

@Injectable()
export class DeleteTaskService {
  async deleteOneTask(
    taskId: SelectTasks['id'],
    userToken: SelectUsers['token'],
  ): Promise<SelectTasks> {
    const { tasks } = await db.query.usersTable
      .findFirst({
        where: eq(usersTable.token, userToken),
        with: {
          tasks: {
            columns: {
              id: true,
            },
          },
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Failed to fetch to the database',
        );
      });
    if (
      tasks.some(({ id }) => {
        return id === taskId;
      })
    ) {
      const task = await db
        .delete(tasksTable)
        .where(eq(tasksTable.id, taskId))
        .returning()
        .catch(() => {
          throw new InternalServerErrorException('Failed to fetch database');
        });
      return task[0];
    } else {
      throw new NotFoundException('Cannot find task from the requested id');
    }
  }
}
