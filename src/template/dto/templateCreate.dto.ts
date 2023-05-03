import { CampaignResDTO } from "src/campaign/dto/campaignRes.dto";

export class TemplateCreateDTO {
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    fileId: string;
    campaigns: CampaignResDTO[];
}
