import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
require('dotenv').config();

export async function JWTVerify(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_KEY)
    }
    catch(err) {
        console.log('jwt', err);
        throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
}

export async function JwtEncode(data: any){
   
    const payload = {
        id: data.id, 
        username: data.username, 
        password: data.password, 
        fullname: data.fullname
    }
    
    return jwt.sign(payload, process.env.JWT_KEY)
}
