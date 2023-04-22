import { Logger } from '@nestjs/common';

export class CustomLogger extends Logger {
  errorException(exception: any, context?: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${context || 'Default'}] ${
      exception.name
    } - ${exception.message} - ${exception.cause}`;
    super.error(logMessage);
  }
}
