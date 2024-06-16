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
    let task: SelectTasks[];
    try {
      task = await db.select().from(tasksTable).where(eq(tasksTable.id, id));
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
    if (!task[0]) {
      throw new NotFoundException();
    } else {
      return task[0];
    }
  }
  async getAllTasks(): Promise<[SelectTasks[], string | null]> {
    let tasks: SelectTasks[];
    try {
      tasks = await db.select().from(tasksTable);
      return [tasks, null];
    } catch {
      throw new InternalServerErrorException('Failed to fetch to the database');
    }
  }
}
