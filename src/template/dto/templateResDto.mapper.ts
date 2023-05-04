import { Template } from '../entity/Template.entity';
import { TemplateResDTO } from './templateRes.dto';

export const templateResDtoMapper = (
    templateEntity: Template,
): TemplateResDTO => ({
    id: templateEntity.id,
    name: templateEntity.name,
    description: templateEntity.description,
    createdBy: templateEntity.createdBy,
    createdAt: templateEntity.createdAt,
    updatedBy: templateEntity.updatedBy,
    updatedAt: templateEntity.updatedAt,
    fileId: templateEntity.fileId,
    campaigns: templateEntity.campaigns,
});
