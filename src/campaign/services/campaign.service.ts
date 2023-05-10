import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Campaign } from '../entity/Campaign.entity';
import { CampaignCreateDTO } from '../dto/campaignCreate.dto';
import { CampaignUpdateDTO } from '../dto/campaignUpdate.dto';
import { CampaignResDTO } from '../dto/campaignRes.dto';
import { campaignResDtoMapper } from '../dto/campaignResDto.mapper';
import { CampaignRepoException } from '../exceptions/campaignRepo.exception';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
    ) {}

    public async getAllCampaigns(): Promise<CampaignResDTO[]> {
        try {
            const allCampaigns: Campaign[] =
                await this.campaignRepository.find();
            return allCampaigns.map((campaign: Campaign) =>
                campaignResDtoMapper(campaign),
            );
        } catch (error) {
            throw new CampaignRepoException(
                'Error while getting all campaigns.',
                { cause: error },
            );
        }
    }

    public async getCampaignById(campaignId: number): Promise<CampaignResDTO> {
        try {
            const campaign: Campaign | null =
                await this.campaignRepository.findOne({
                    where: { id: campaignId },
                });
            if (!campaign) {
                throw new NotFoundException('Campaign not found.');
            }
            return campaignResDtoMapper(campaign);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new CampaignRepoException(
                `Error while getting campaign with passed id: ${campaignId}`,
                { cause: error },
            );
        }
    }

    public async createCampaign(
        campaignCreateDTO: CampaignCreateDTO,
        createdBy: string,
    ): Promise<CampaignResDTO> {
        try {
            const newCampaign: Campaign = this.campaignRepository.create({
                createdBy,
                createdAt: new Date(Date.now()),
                ...campaignCreateDTO,
            });
            const savedCampaign: Campaign = await this.campaignRepository.save(
                newCampaign,
            );

            return campaignResDtoMapper(savedCampaign);
        } catch (error) {
            throw new CampaignRepoException(
                `Error while creating campaign, payload: ${JSON.stringify(
                    campaignCreateDTO,
                    null,
                    2,
                )}.`,
                { cause: error },
            );
        }
    }

    public async updateCampaign(
        campaignId: number,
        campaignUpdateDTO: CampaignUpdateDTO,
        updatedBy: string,
    ): Promise<CampaignResDTO> {
        try {
            const result: UpdateResult = await this.campaignRepository.update(
                campaignId,
                {
                    updatedBy,
                    updatedAt: new Date(Date.now()),
                    ...campaignUpdateDTO,
                },
            );
            if (!result.affected)
                throw new NotFoundException(
                    'Cannot update campaign! Resource not found.',
                );

            const updatedCampaign: CampaignResDTO = await this.getCampaignById(
                campaignId,
            );
            return updatedCampaign;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new CampaignRepoException(
                `Error while updating campaign with passed id: ${campaignId}, payload: ${JSON.stringify(
                    campaignUpdateDTO,
                    null,
                    2,
                )}.`,
                { cause: error },
            );
        }
    }

    public async deleteCampaign(campaignId: number): Promise<true> {
        try {
            const result: DeleteResult = await this.campaignRepository.delete(
                campaignId,
            );
            if (!result.affected)
                throw new NotFoundException(
                    'Cannot delete campaign! Resource not found.',
                );
            return true;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new CampaignRepoException(
                `Error while deleting campaign with passed id: ${campaignId}`,
                { cause: error },
            );
        }
    }
}
