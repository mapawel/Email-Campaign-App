import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../entity/Template.entity';
import { TemplateResDTO } from '../dto/templateRes.dto';
import { TemplateCreateDTO } from '../dto/templateCreate.dto';
import { TemplateUpdateDTO } from '../dto/templateUpdate.dto';
import { templateResDtoMapper } from '../dto/templateResDto.mapper';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>,
    ) {}

    public async getAllTemplates(): Promise<TemplateResDTO[]> {
        const allTemplates: Template[] = await this.templateRepository.find();
        return allTemplates.map((template: Template) =>
            templateResDtoMapper(template),
        );
    }

    public async getTemplateById(templateId: number): Promise<TemplateResDTO> {
        const template: Template | null = await this.templateRepository.findOne(
            {
                where: { id: templateId },
            },
        );
        if (!template) {
            throw new NotFoundException('Template not found');
        }
        return templateResDtoMapper(template);
    }

    public async createTemplate(
        templateCreateDTO: TemplateCreateDTO,
    ): Promise<TemplateResDTO> {
        try {
            const newTemplate: Template = await this.templateRepository.create(
                templateCreateDTO,
            );
            const savedTemplate: Template = await this.templateRepository.save(
                newTemplate,
            );
            return templateResDtoMapper(savedTemplate);
        } catch (error) {
            throw new Error(error, { cause: error });
        }
    }

    public async updateTemplate(
        templateId: number,
        templateUpdateDTO: TemplateUpdateDTO,
    ): Promise<TemplateResDTO> {
        return {} as TemplateResDTO;
    }

    public async deleteTemplate(templateId: string): Promise<boolean> {
        return true;
    }
}
