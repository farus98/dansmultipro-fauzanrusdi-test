import { Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios'
import axiosRetry from 'axios-retry'
import { stringify } from 'qs'

enum httpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

@Injectable()
export class HttpService {

    async SEND(
        url: string,
        method: httpMethod,
        query: object,
        data: any,
        path: string,
        header: object,
    ) {
        const options: AxiosRequestConfig = {
          url: path, // this is endpoint not base url
          method,
          baseURL: url,
          headers: header
            ? Object.assign(header, { 'Content-type': 'application/json' }, {'key':'client03-TSbs94s3q5H9PP2yNPBr'})
            : { 'Content-type': 'application/json' }, 
          params: query,
          data,
          timeout: 90 * 1000, // timeout in ms
          paramsSerializer: params => stringify(params),
          validateStatus(status) {
            return status >= 200 && status < 500 // default response
          },
        }
        // console.log(url+path)
        console.log("option", options)
    
        await axiosRetry(axios, { retries: 3 })
    
        return await axios.request(options)
    }
    
    public async GET(url: string, path: string, query: object, header: object) {
        return await this.SEND(url, httpMethod.GET, query, {}, path, header)
    }
    
}
