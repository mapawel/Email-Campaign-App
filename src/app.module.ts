import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { MainExceptionFilter } from './app-exception-filters/main-exception.filter';
import { Campaign } from './campaign/entity/Campaign.entity';
import { Template } from './template/entity/Template.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
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
        TypeOrmModule.forFeature([Template, Campaign]),
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
