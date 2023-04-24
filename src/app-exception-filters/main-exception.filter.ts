import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MainExceptionFilter implements ExceptionFilter {
  private readonly logger: LoggerService = new Logger(MainExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    this.logger.error(exception);

    response.status(status).json({
      message:
        status === 500
          ? 'Ups... Something went wrong. Try again later.'
          : exception.message,
    });
  }
}
