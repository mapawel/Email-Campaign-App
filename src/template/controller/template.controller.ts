import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { TemplateService } from '../services/template.service';
import { TemplateUpdateDTO } from '../dto/templateUpdate.dto';
import { TemplateCreateDTO } from '../dto/templateCreate.dto';

@Controller('template')
export class TemplateController {
    private readonly templateService: TemplateService;

    @Get()
    async getTemplates() {
        return await this.templateService.getAllTemplates();
    }

    @Get(':id')
    async getTemplateById(@Param('id') templateId: string) {
        return await this.templateService.getTemplateById(templateId);
    }

    @Post()
    async createTemplate(@Body() templateCreateDTO: TemplateCreateDTO) {
        return await this.templateService.createTemplate(templateCreateDTO);
    }

    @Patch(':id')
    async updateTemplate(
        @Param('id') templateId: string,
        @Body() templateUpdateDTO: TemplateUpdateDTO,
    ) {
        return await this.templateService.updateTemplate(
            templateId,
            templateUpdateDTO,
        );
    }

    @Delete(':id')
    async deleteTemplate(@Param('id') templateId: string) {
        return await this.templateService.deleteTemplate(templateId);
    }
}
