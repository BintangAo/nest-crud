import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/db';
import { InsertTasks, tasksTable } from 'src/schema';
@Injectable()
export class CreateTasksService {
  async createOneTask(
    title: InsertTasks['title'],
    content: InsertTasks['content'],
  ) {
    try {
      const task = await db
        .insert(tasksTable)
        .values({
          title,
          content,
        })
        .returning();
      return task;
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
}
