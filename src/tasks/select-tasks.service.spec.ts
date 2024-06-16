import { Test, TestingModule } from '@nestjs/testing';
import { SelectTaskService } from './select-tasks.service';

describe('SelectTaskService', () => {
  let service: SelectTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectTaskService],
    }).compile();

    service = module.get<SelectTaskService>(SelectTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
