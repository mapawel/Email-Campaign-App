import { Campaign } from '../entity/Campaign.entity';
import { CampaignResDTO } from './campaignRes.dto';

export const campaignResDtoMapper = (
    campaignEntity: Campaign,
): CampaignResDTO => ({
    id: campaignEntity.id,
    name: campaignEntity.name,
    description: campaignEntity.description,
    status: campaignEntity.status,
    template: campaignEntity.template,
    eMailProvider: campaignEntity.eMailProvider,
    content: campaignEntity.content,
    eMailTitle: campaignEntity.eMailTitle,
    eMails: campaignEntity.eMails,
    manager: campaignEntity.manager,
    employees: campaignEntity.employees,
    updatedAt: campaignEntity.updatedAt,
    updatedBy: campaignEntity.updatedBy,
    createdAt: campaignEntity.createdAt,
    createdBy: campaignEntity.createdBy,
    executedAt: campaignEntity.executedAt,
    executedBy: campaignEntity.executedBy,
});
