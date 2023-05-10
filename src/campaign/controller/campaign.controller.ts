import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { CampaignService } from '../services/campaign.service';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/decorators/userId.decorator';
import { CampaignResDTO } from '../dto/campaignRes.dto';
import { CampaignUpdateDTO } from '../dto/campaignUpdate.dto';
import { CampaignCreateDTO } from '../dto/campaignCreate.dto';

@Controller(Routes.CAMPAIGN_ROUTE)
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_CAMPAIGNS])
    @Get()
    async getCampaigns(): Promise<CampaignResDTO[]> {
        return await this.campaignService.getAllCampaigns();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_CAMPAIGNS])
    @Get(':id')
    async getCampaignById(
        @Param('id') campaignId: number,
    ): Promise<CampaignResDTO> {
        return await this.campaignService.getCampaignById(campaignId);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.CREATE_CAMPAIGNS])
    @Post()
    async createCampaign(
        @Body() campaignCreateDTO: CampaignCreateDTO,
        @UserId() userId: string,
    ): Promise<CampaignResDTO> {
        return await this.campaignService.createCampaign(
            campaignCreateDTO,
            userId,
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.UPDATE_CAMPAIGNS])
    @Patch(':id')
    async updateCampaign(
        @Param('id') campaignId: number,
        @Body() campaignUpdateDTO: CampaignUpdateDTO,
        @UserId() userId: string,
    ): Promise<CampaignResDTO> {
        return await this.campaignService.updateCampaign(
            campaignId,
            campaignUpdateDTO,
            userId,
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.DELETE_CAMPAIGNS])
    @Delete(':id')
    async deleteCampaign(@Param('id') campaignId: number): Promise<true> {
        return await this.campaignService.deleteCampaign(campaignId);
    }
}
