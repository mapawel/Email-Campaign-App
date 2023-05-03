import { Injectable } from '@nestjs/common';
import { TemplateResDTO } from '../dto/templateRes.dto';
import { TemplateCreateDTO } from '../dto/templateCreate.dto';
import { TemplateUpdateDTO } from '../dto/templateUpdate.dto';

@Injectable()
export class TemplateService {
    public async getAllTemplates(): Promise<TemplateResDTO[]> {
        return [];
    }

    public async getTemplateById(templateId: string): Promise<TemplateResDTO> {
        return {} as TemplateResDTO;
    }

    public async createTemplate(
        templateCreateDTO: TemplateCreateDTO,
    ): Promise<TemplateResDTO> {
        return {} as TemplateResDTO;
    }

    public async updateTemplate(
        templateId: string,
        templateUpdateDTO: TemplateUpdateDTO,
    ): Promise<TemplateResDTO> {
        return {} as TemplateResDTO;
    }

    public async deleteTemplate(templateId: string): Promise<boolean> {
        return true;
    }
}
