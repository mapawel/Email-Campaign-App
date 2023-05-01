import { Module } from '@nestjs/common';
import { AuthController } from './controller/Auth.controller';
import { AuthService } from './service/Auth.service';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: 'BASE_URL',
            useFactory: (configService: ConfigService) =>
                configService.get('BASE_URL'),
            inject: [ConfigService],
        },
        {
            provide: 'AUTH0_BASE_URL',
            useFactory: (configService: ConfigService) =>
                configService.get('AUTH0_BASE_URL'),
            inject: [ConfigService],
        },
        {
            provide: 'AUTH0_CLIENT_ID',
            useFactory: (configService: ConfigService) =>
                configService.get('AUTH0_CLIENT_ID'),
            inject: [ConfigService],
        },
        {
            provide: 'AUTH0_CLIENT_SECRET',
            useFactory: (configService: ConfigService) =>
                configService.get('AUTH0_CLIENT_SECRET'),
            inject: [ConfigService],
        },
        {
            provide: 'AUTH0_AUTHORIZE_ROUTE',
            useFactory: (configService: ConfigService) =>
                configService.get('AUTH0_AUTHORIZE_ROUTE'),
            inject: [ConfigService],
        },
        {
            provide: 'AUTH0_GET_TOKEN_ROUTE',
            useFactory: (configService: ConfigService) =>
                configService.get('AUTH0_GET_TOKEN_ROUTE'),
            inject: [ConfigService],
        },
        {
            provide: 'AUTH0_AUTH_API_AUDIENCE',
            useFactory: (configService: ConfigService) =>
                configService.get('AUTH0_AUTH_API_AUDIENCE'),
            inject: [ConfigService],
        },
    ],
})
export class AuthModule {}
