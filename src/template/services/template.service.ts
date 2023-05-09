import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Template } from '../entity/Template.entity';
import { TemplateResDTO } from '../dto/templateRes.dto';
import { TemplateCreateDTO } from '../dto/templateCreate.dto';
import { TemplateUpdateDTO } from '../dto/templateUpdate.dto';
import { templateResDtoMapper } from '../dto/templateResDto.mapper';
import { TemplateRepoException } from '../exceptions/templateRepo.exception';
import { ConfigService } from '@nestjs/config';
import { TemplateProceederData } from '../types/templateProceederData.type';

@Injectable({ scope: Scope.REQUEST })
export class TemplateService {
    private readonly auth0Namespace: string;
    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>,
        @Inject(REQUEST) private readonly request: Request & { user: any },
        private readonly configService: ConfigService,
    ) {
        this.auth0Namespace = this.configService.get<string>(
            'AUTH0_NAMESPACE',
            '',
        );
    }

    public async getAllTemplates(): Promise<TemplateResDTO[]> {
        try {
            const allTemplates: Template[] =
                await this.templateRepository.find();
            return allTemplates.map((template: Template) =>
                templateResDtoMapper(template),
            );
        } catch (error) {
            throw new TemplateRepoException(
                'Error while getting all templates.',
                { cause: error },
            );
        }
    }

    public async getTemplateById(templateId: number): Promise<TemplateResDTO> {
        try {
            const template: Template | null =
                await this.templateRepository.findOne({
                    where: { id: templateId },
                });
            if (!template) {
                throw new NotFoundException('Template not found.');
            }
            return templateResDtoMapper(template);
        } catch (error) {
            throw new TemplateRepoException(
                `Error while getting template with passed id: ${templateId}`,
                { cause: error },
            );
        }
    }

    public async createTemplate(
        templateCreateDTO: TemplateCreateDTO,
    ): Promise<TemplateResDTO> {
        try {
            const { proceedingBy, proceedingAt }: TemplateProceederData =
                this.getCreatindData();

            const newTemplate: Template = this.templateRepository.create({
                createdBy: proceedingBy,
                createdAt: proceedingAt,
                ...templateCreateDTO,
            });
            const savedTemplate: Template = await this.templateRepository.save(
                newTemplate,
            );

            return templateResDtoMapper(savedTemplate);
        } catch (error) {
            throw new TemplateRepoException(
                `Error while creating template, payload: ${JSON.stringify(
                    templateCreateDTO,
                    null,
                    2,
                )}.`,
                { cause: error },
            );
        }
    }

    public async updateTemplate(
        templateId: number,
        templateUpdateDTO: TemplateUpdateDTO,
    ): Promise<TemplateResDTO> {
        try {
            const { proceedingBy, proceedingAt }: TemplateProceederData =
                this.getCreatindData();

            const result: UpdateResult = await this.templateRepository.update(
                templateId,
                {
                    updatedBy: proceedingBy,
                    updatedAt: proceedingAt,
                    ...templateUpdateDTO,
                },
            );
            if (!result.affected)
                throw new NotFoundException(
                    'Cannot update template! Resource not found.',
                );

            const updatedTemplate: TemplateResDTO = await this.getTemplateById(
                templateId,
            );
            return updatedTemplate;
        } catch (error) {
            throw new TemplateRepoException(
                `Error while updating template with passed id: ${templateId}, payload: ${JSON.stringify(
                    templateUpdateDTO,
                    null,
                    2,
                )}.`,
                { cause: error },
            );
        }
    }

    public async deleteTemplate(templateId: number): Promise<true> {
        try {
            const result: DeleteResult = await this.templateRepository.delete(
                templateId,
            );
            if (!result.affected)
                throw new NotFoundException(
                    'Cannot delete template! Resource not found.',
                );
            return true;
        } catch (error) {
            throw new TemplateRepoException(
                `Error while deleting template with passed id: ${templateId}`,
                { cause: error },
            );
        }
    }

    private getCreatindData(): TemplateProceederData {
        return {
            proceedingAt: new Date(Date.now()),
            proceedingBy:
                this.request?.user?.[`${this.auth0Namespace}/userInfo`].user_id,
        };
    }
}
