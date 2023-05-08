import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { TemplateService } from '../services/template.service';
import { TemplateUpdateDTO } from '../dto/templateUpdate.dto';
import { TemplateCreateDTO } from '../dto/templateCreate.dto';
import { TemplateResDTO } from '../dto/templateRes.dto';

@Controller(Routes.TEMPLATE_ROUTE)
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Get()
    async getTemplates(): Promise<TemplateResDTO[]> {
        return await this.templateService.getAllTemplates();
    }

    @Get(':id')
    async getTemplateById(
        @Param('id') templateId: number,
    ): Promise<TemplateResDTO> {
        return await this.templateService.getTemplateById(templateId);
    }

    @Post()
    async createTemplate(
        @Body() templateCreateDTO: TemplateCreateDTO,
    ): Promise<TemplateResDTO> {
        return await this.templateService.createTemplate(templateCreateDTO);
    }

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

    @Delete(':id')
    async deleteTemplate(@Param('id') templateId: number): Promise<true> {
        return await this.templateService.deleteTemplate(templateId);
    }
}
