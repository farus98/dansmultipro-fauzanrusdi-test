import { Controller, Post, Body, UseInterceptors} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseSuccessInteceptor } from '../../libs/interceptor/response-success.interceptor';

@Controller('user')
export class UserController {
    constructor(
        private service: UserService
    ){}

    @UseInterceptors(ResponseSuccessInteceptor)
    @Post("/login")
    async Login(@Body() data: any){
        return await this.service.login(data)
    }
}
