import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { HttpModule } from 'src/libs/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
