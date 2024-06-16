import { Test, TestingModule } from '@nestjs/testing';
import { CreateTasksService } from './create-tasks.service';

describe('CreateTasksService', () => {
  let service: CreateTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTasksService],
    }).compile();

    service = module.get<CreateTasksService>(CreateTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
