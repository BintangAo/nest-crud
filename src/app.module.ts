import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { CreateTaskService } from './tasks/create-task.service';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [AppService, CreateTaskService],
})
export class AppModule {}
