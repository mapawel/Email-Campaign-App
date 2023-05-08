import { CampaignCreateDTO } from './campaignCreate.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CampaignUpdateDTO extends PartialType(CampaignCreateDTO) {}
