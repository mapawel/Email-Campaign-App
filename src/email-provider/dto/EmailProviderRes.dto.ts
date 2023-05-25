import { CampaignResDTO } from '../../campaign/dto/campaignRes.dto';

export class EmailProviderResDTO {
    id: number;
    name: string;
    eMail: string;
    campaigns: CampaignResDTO[];
}
