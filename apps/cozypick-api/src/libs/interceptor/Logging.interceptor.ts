
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { ContextCreator } from '@nestjs/core/helpers/context-creator';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger();
   public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const recordTime = Date.now();
    const requestType = context.getType<GqlContextType>();
    

    if(requestType==="http"){
        // DEVELOP
        return next.handle();
    }else if (requestType === "graphql"){
    const gqlContext = GqlExecutionContext.create(context);
    console.log('gqlContext=>', )
    this.logger.log(`${this.stringify(gqlContext.getContext().req.body)}`,'REQUEST');
    return next.handle()
      .pipe(
        tap((context) => {
        const responceTime = Date.now() - recordTime;
        this.logger.log(`${this.stringify(context)} - ${responceTime}ms \n\n`, 'RESPONSE');
      })
      );
    }

    // Fallback return in case neither http nor graphql
    return next.handle();
  }
  private stringify(context: ExecutionContext): string{
    return  JSON.stringify(context).slice(0,75);

  }
}
