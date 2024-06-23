import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { InsertTasks, SelectUsers, tasksTable, usersTable } from 'src/schema';
@Injectable()
export class CreateTasksService {
  async createOneTask(
    title: InsertTasks['title'],
    content: InsertTasks['content'],
    userToken: SelectUsers['token'],
  ) {
    try {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.token, userToken),
      });
      const task = await db
        .insert(tasksTable)
        .values({
          title,
          content,
          userId: user.id,
        })
        .returning();
      return task;
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
}
