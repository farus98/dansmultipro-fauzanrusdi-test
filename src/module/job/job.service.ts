import { Injectable } from '@nestjs/common';
import { HttpService } from '../../libs/http/http.service';

@Injectable()
export class JobService {
    constructor(
        private readonly httpService: HttpService
    ){}

    public async GetJobList(query: any){

        let params = {}

        if(query.description && query.location && query.full_time){
            params = {
                description: query.description, 
                location: query.location, 
                full_time: true
            }
        }

        if(query.description && query.location){
            params = { description: query.description, location: query.location }
        }

        if(query.description && query.full_time){
            params = { description: query.description, full_time: true }
        }

        if(query.location && query.description){
            params = { location: query.location, description: query.description, }
        }

        if(query.location && query.full_time){
            params = { location: query.location, full_time: true }
        }

        if(query.full_time && query.description){
            params = { full_time: true, description: query.description, }
        }

        if(query.full_time && query.location){
            params = { full_time: true, location: query.location }
        }

        if(query.description){
            params = { description: query.description }
        }

        if(query.location){
            params = { location: query.location}
        }

        if(query.full_time){
            params = { full_time: true }
        }

        if(query.page){
            if(query.page>2){
                return { code: 404, msg: 'data not found', data: [] }
            }

            params =+ { page: query.page}
        }

        const getData = await this.httpService.GET('http://dev3.dansmultipro.co.id', '/api/recruitment/positions.json', params, {})
        
        if(getData.data.length == 0){
            return []
        }

        return getData.data

    }

    public async GetDetailJob(id: string){
        
        const getData = await this.httpService.GET('http://dev3.dansmultipro.co.id', '/api/recruitment/positions/'+id, {}, {})
        console.log('getData', getData.data);
        
        if(Object.keys(getData.data).length === 0 && getData.data.constructor === Object){
            console.log('sono');
            return undefined
           
        }else{
            console.log('sini');
            return getData.data
        }

        
    }
    
}