import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { SelectTasks, tasksTable } from 'src/schema';

@Injectable()
export class SelectTaskService {
  async getOneTask(id: SelectTasks['id']): Promise<SelectTasks> {
    try {
      const task = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.id, id));
      if (!task[0]) {
        throw new NotFoundException();
      } else {
        return task[0];
      }
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
  async getAllTasks(): Promise<SelectTasks> {
    let tasks: SelectTasks[];
    try {
      tasks = await db.select().from(tasksTable);
      return tasks[0];
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
}
