import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entity/Campaign.entity';
import { CampaignController } from './controller/campaign.controller';
import { CampaignService } from './services/campaign.service';

@Module({
    imports: [TypeOrmModule.forFeature([Campaign])],
    controllers: [CampaignController],
    providers: [CampaignService],
})
export class CampaignModule {}
