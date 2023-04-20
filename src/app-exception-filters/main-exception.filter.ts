import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class MainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    this.printErrorToConsole(exception, status);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private printErrorToConsole(exception: Error, status: number): void {
    console.log('\n', '>>>>> MAIN APP EXCEPTIONS HANDLER: <<<<<<');
    console.log('NAME: ', exception.name);
    console.log('STATUS: ', status);
    console.log('MESSAGE: ', exception.message);
    console.log('CAUSE: ', exception.cause);
    console.log('TIME: ', new Date().toISOString(), '\n');
  }
}
