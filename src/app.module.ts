import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MainExceptionFilter } from './app-exception-filters/main-exception.filter';
import { DBModule } from './DB/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DBModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MainExceptionFilter,
    },
  ],
})
export class AppModule {}
