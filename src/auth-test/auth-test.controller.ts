import { UseGuards, Controller, Get } from '@nestjs/common';
import { AuthTestService } from './auth-test.service';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

// TO REMOVE AFTER MANUAL TESTS
@Controller()
export class AuthTestController {
    constructor(private readonly authTestService: AuthTestService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(['read:users'])
    @Get()
    getTestElements(): string[] {
        return this.authTestService.getTestElements();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions(['read:templates', 'execute:campaigns'])
    @Get('/2')
    getTestElement(): string[] {
        return this.authTestService.getTestElements();
    }
}
