import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
export interface Response<T> {
  data: T;
}

export class ResponseSuccessInteceptor<T> implements NestInterceptor<T, Response<T>> {
  private getData(data: any) {
    if (!!data) {
      if(data.length == 0){
        return []
      }
      return data;
    }

    return {};
  }

  private getMeta(data: any) {
    if (!!data) {
      return {
        response_code: 200,
        message: "success",
      }
    }
    return {
      response_code: 404,
      message: "data not found",
    }
  }


  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        ...this.getMeta(data),
        data: this.getData(data),
        error: "",
        error_data:[]
      })),
    );
  }
}
