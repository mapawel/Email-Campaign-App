import { CampaignResDTO } from 'src/campaign/dto/campaignRes.dto';

export class TemplateResDTO {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    fileId: string;
    campaigns: CampaignResDTO[];
}
