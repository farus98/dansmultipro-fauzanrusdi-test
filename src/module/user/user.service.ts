import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Login } from '../../entity/login.entity';
import { JwtEncode } from '../../libs/jwt/jwt.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Login) private readonly loginRepo: Repository<Login>
    ){}

    public async login(body: any){

        const getUser = await this.loginRepo.findOne({where:{username: body.username}})
        // const getUser = await this.DummyDataUser(body.username)
        // console.log('getUserf', getUser);
        
        if(!getUser){
            throw new HttpException('Wrong Username', HttpStatus.UNAUTHORIZED);
        }

        const isMatch = await bcrypt.compare(body.password, getUser.password);
        console.log('isMatch', isMatch);
            
        if(isMatch == false){
            throw new HttpException('Wrong Password', HttpStatus.UNAUTHORIZED);
        }
                
        const token = await JwtEncode(getUser)

        return token
       
    }

    private async DummyDataUser(check){
        const saltOrRounds = 10;
        const password = 'test_User123';
        const hash = await bcrypt.hash(password, saltOrRounds);
        console.log('password', hash);
        
        const user = {
            username: 'rusdi', 
            password: hash
        }

        if(check == user.username){
            return user
        }

        return undefined
    }
}
