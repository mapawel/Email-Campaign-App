import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomLogger } from 'src/custom-logger/CustomLogger';

@Catch()
export class MainExceptionFilter implements ExceptionFilter {
  private readonly logger = new CustomLogger();

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    this.logger.errorException(exception, MainExceptionFilter.name);

    response.status(status).json({
      message:
        status === 500
          ? 'Ups... Something went wrong. Try again later.'
          : exception.message,
    });
  }
}
