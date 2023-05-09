import { IsString, Length, IsEmail } from 'class-validator';
import validators from '../../validation/settings/validators.json';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';

const getCampaignValidatorParam =
    buildValidatorKeyParamsGetter<CampaignCreateDTO>({
        entityName: 'campaign',
        validatorsObject: validators,
    });

export class CampaignCreateDTO {
    @IsString()
    @Length(
        getCampaignValidatorParam('name', 'minLength') || 4,
        getCampaignValidatorParam('name', 'maxLength') || 36,
    )
    name: string;

    @IsString()
    @Length(
        getCampaignValidatorParam('description', 'minLength') || 4,
        getCampaignValidatorParam('description', 'maxLength') || 36,
    )
    description: string;

    @IsString()
    @Length(
        getCampaignValidatorParam('eMailTitle', 'minLength') || 4,
        getCampaignValidatorParam('eMailTitle', 'maxLength') || 36,
    )
    eMailTitle: string;

    @IsEmail()
    eMails: string[];

    @IsString()
    @Length(
        getCampaignValidatorParam('manager', 'minLength') || 4,
        getCampaignValidatorParam('manager', 'maxLength') || 36,
    )
    manager: string;

    @IsString()
    employees: string[];
}
