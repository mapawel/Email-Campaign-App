import { Module } from '@nestjs/common';
import { AuthController } from './controller/Auth.controller';
import { AuthService } from './service/Auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [AuthController],
    providers: [AuthService, ConfigService],
})
export class AuthModule {}
