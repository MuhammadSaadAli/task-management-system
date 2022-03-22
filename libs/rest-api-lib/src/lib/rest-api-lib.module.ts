import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule, AuthModule],
  controllers: [],
  providers: [],
  // exports: [],
})
export class RestApiLibModule {}
