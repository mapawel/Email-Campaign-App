import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/Auth.module';
import { AuthTestModule } from './auth-test/auth-test.module';
import { MainExceptionFilter } from './exceptionFilters/mainException.filter';
import { TemplateModule } from './template/template.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.auth'],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logNotifications: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        AuthTestModule,
        TemplateModule,
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
