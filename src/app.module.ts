import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { SelectTaskService } from './tasks/select-tasks.service';
import { CreateTasksService } from './tasks/create-tasks.service';
import { UsersController } from './users/users.controller';
import { RegisterService } from './users/register/register.service';
import { LoginService } from './users/login/login.service';
import { DeleteTaskService } from './tasks/delete-task.service';
import { UpdateTaskService } from './tasks/update-task.service';

@Module({
  controllers: [AppController, TasksController, UsersController],
  providers: [
    AppService,
    SelectTaskService,
    CreateTasksService,
    RegisterService,
    LoginService,
    DeleteTaskService,
    UpdateTaskService,
  ],
})
export class AppModule {}
