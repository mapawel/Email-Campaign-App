import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { TemplateService } from '../services/template.service';
import { TemplateUpdateDTO } from '../dto/templateUpdate.dto';
import { TemplateCreateDTO } from '../dto/templateCreate.dto';
import { TemplateResDTO } from '../dto/templateRes.dto';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller(Routes.TEMPLATE_ROUTE)
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_TEMPLATES])
    @Get()
    async getTemplates(): Promise<TemplateResDTO[]> {
        return await this.templateService.getAllTemplates();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_TEMPLATES])
    @Get(':id')
    async getTemplateById(
        @Param('id') templateId: number,
    ): Promise<TemplateResDTO> {
        return await this.templateService.getTemplateById(templateId);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.CREATE_TEMPLATES])
    @Post()
    async createTemplate(
        @Body() templateCreateDTO: TemplateCreateDTO,
    ): Promise<TemplateResDTO> {
        return await this.templateService.createTemplate(templateCreateDTO);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.UPDATES_TEMPLATES])
    @Patch(':id')
    async updateTemplate(
        @Param('id') templateId: number,
        @Body() templateUpdateDTO: TemplateUpdateDTO,
    ): Promise<TemplateResDTO> {
        return await this.templateService.updateTemplate(
            templateId,
            templateUpdateDTO,
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.DELETE_TEMPLATES])
    @Delete(':id')
    async deleteTemplate(@Param('id') templateId: number): Promise<true> {
        return await this.templateService.deleteTemplate(templateId);
    }
}
