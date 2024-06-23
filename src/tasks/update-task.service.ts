import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { SelectTasks, SelectUsers, tasksTable, usersTable } from 'src/schema';

export type TaskUpdate = {
  title?: SelectTasks['title'];
  content?: SelectTasks['content'];
};
@Injectable()
export class UpdateTaskService {
  async updateOneTask(
    taskId: SelectTasks['id'],
    userToken: SelectUsers['token'],
    taskUpdate: TaskUpdate,
  ) {
    const user = await db.query.usersTable
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
        throw new InternalServerErrorException('Failed fetch to database');
      });
    if (
      user.tasks.some(({ id }) => {
        return id === taskId;
      })
    ) {
      const task = await db
        .update(tasksTable)
        .set(taskUpdate)
        .returning()
        .catch(() => {
          throw new InternalServerErrorException('Failed fetch to database');
        });
      return task[0];
    } else {
      throw new NotFoundException('Cannot find task from the requested id');
    }
  }
}
