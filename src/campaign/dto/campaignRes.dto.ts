import { CampaignStatus } from '../status/campaign-status.enum';
import { MailContentType } from '../../template/types/Mail-content.type';
import { TemplateResDTO } from '../../template/dto/templateRes.dto';
import { EmailProviderResDTO } from '../../email-provider/dto/EmailProviderRes.dto';

export class CampaignResDTO {
    id: number;
    name: string;
    description: string;
    status: CampaignStatus;
    template: TemplateResDTO;
    eMailProvider: EmailProviderResDTO;
    content: MailContentType;
    eMailTitle: string;
    eMails: string[];
    manager: string;
    employees: string[];
    updatedAt: Date;
    updatedBy: string;
    createdAt: Date;
    createdBy: string;
    executedAt: Date;
    executedBy: string;
}
