import { UseGuards, Controller, Get } from '@nestjs/common';
import { AuthTestService } from './auth-test.service';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/auth/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions/permissions.guard';
import { PermissionsEnum } from 'src/auth/permissions/permissions.enum';

// TO REMOVE AFTER MANUAL TESTS
@Controller()
export class AuthTestController {
    constructor(private readonly authTestService: AuthTestService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.read_users])
    @Get()
    getTestElements(): string[] {
        return this.authTestService.getTestElements();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([
        PermissionsEnum.read_templates,
        PermissionsEnum.execute_campaigns,
    ])
    @Get('/2')
    getTestElement(): string[] {
        return this.authTestService.getTestElements();
    }
}
