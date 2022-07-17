import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from "@nestjs/common";
  import { Request, Response } from "express";
  
  @Catch()
  export class respErrorInteceptor implements ExceptionFilter {
    /**
     * Get Incomplete/error form validation message
     * @param exception
     */
    catch(exception: HttpException, host: ArgumentsHost) {
  
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      
      let message = exception.message;
      const getErrorData:any= exception
      response.status(status).json({
        meta: {
          code: status,
          msg: exception.message,
        },
        data: {},
        error: message,
        error_data: getErrorData.response?(getErrorData.response.message)?getErrorData.response.message:[]:[]
  
      });
    }
  }
  