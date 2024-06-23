import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateTasksService } from './create-tasks.service';
import { SelectTaskService } from './select-tasks.service';
import { InsertTasks, SelectTasks } from 'src/schema';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('tasks')
@UseGuards(new AuthGuard())
export class TasksController {
  constructor(
    private readonly createTask: CreateTasksService,
    private readonly selectTask: SelectTaskService,
  ) {}

  @Get(':id')
  async find(@Param() params: { id: SelectTasks['id'] }, @Res() res: Response) {
    const data = await this.selectTask.getOneTask(params.id);

    return res.json(data);
  }
  @Get()
  async findAll(@Res() res: Response) {
    const tasks = await this.selectTask.getAllTasks();
    return res.json(tasks);
  }
  @Post()
  async create(@Body() body: InsertTasks, @Res() res: Response) {
    if (!body.title || !body.content) {
      throw new BadRequestException('Invalid body of request');
    }
    const task = await this.createTask.createOneTask(body.title, body.content);
    return res.json(task);
  }
}
