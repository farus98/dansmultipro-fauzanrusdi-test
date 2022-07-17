import { Controller, Get, Param, Body, UseInterceptors, UseGuards, Headers} from '@nestjs/common';
import { JobService } from './job.service';
import { AuthGuard } from '../../libs/auth/auth.guard';
import { ResponseSuccessInteceptor } from '../../libs/interceptor/response-success.interceptor';

@Controller('job')
export class JobController {
    constructor(
        private service: JobService
    ){}


    @UseGuards(AuthGuard)
    @UseInterceptors(ResponseSuccessInteceptor)
    @Get("list")
    async GetJobList(@Param() param: string){
        return await this.service.GetJobList(param)
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ResponseSuccessInteceptor)
    @Get("detail/:id")
    async GetJobDetail(@Param('id') param: string){
        return await this.service.GetDetailJob(param)
    }
}
