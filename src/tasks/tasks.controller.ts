import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateTasksService } from './create-tasks.service';
import { SelectTaskService } from './select-tasks.service';
import { InsertTasks, SelectTasks } from 'src/schema';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteTaskService } from './delete-task.service';
import { TaskUpdate, UpdateTaskService } from './update-task.service';
@Controller('tasks')
@UseGuards(new AuthGuard())
export class TasksController {
  constructor(
    private readonly createTask: CreateTasksService,
    private readonly selectTask: SelectTaskService,
    private readonly deleteTask: DeleteTaskService,
    private readonly updateTask: UpdateTaskService,
  ) {}

  @Get(':id')
  async find(
    @Param() params: { id: SelectTasks['id'] },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userToken = req.signedCookies['user-token'] as string;
    const data = await this.selectTask.getOneTask(params.id, userToken);

    return res.json(data);
  }
  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userToken = req.signedCookies['user-token'] as string;
    const tasks = await this.selectTask.getAllTasks(userToken);
    return res.json(tasks);
  }
  @Post()
  async create(
    @Body() body: InsertTasks,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userToken = req.signedCookies['user-token'] as string;
    if (!body.title || !body.content) {
      throw new BadRequestException('Invalid body of request');
    }
    const task = await this.createTask.createOneTask(
      body.title,
      body.content,
      userToken,
    );
    return res.json(task);
  }
  @Delete(':id')
  async delete(
    @Param() params: { id: SelectTasks['id'] },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userToken = req.signedCookies['user-token'] as string;
    const task = this.deleteTask.deleteOneTask(params.id, userToken);
    return res.json(task);
  }
  @Patch(':id')
  async update(
    @Param() params: { id: SelectTasks['id'] },
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: TaskUpdate,
  ) {
    if (!body.content && !body.title) {
      throw new BadRequestException('Invalid body of request');
    }
    const userToken = req.signedCookies['user-token'] as string;
    const task = await this.updateTask.updateOneTask(
      params.id,
      userToken,
      body,
    );
    return res.json(task);
  }
}
