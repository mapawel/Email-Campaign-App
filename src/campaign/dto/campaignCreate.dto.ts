import {
    IsString,
    Length,
    IsEmail,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import validators from '../../validation/settings/validators.json';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';
import { MailContentDTO } from '../../campaign/dto/mailContent.dto';
import { trimTransformer } from '../../validation/utils';

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
    @Transform(trimTransformer)
    name: string;

    @IsString()
    @Length(
        getCampaignValidatorParam('description', 'minLength') || 4,
        getCampaignValidatorParam('description', 'maxLength') || 36,
    )
    @Transform(trimTransformer)
    description: string;

    @IsString()
    @Length(
        getCampaignValidatorParam('eMailTitle', 'minLength') || 4,
        getCampaignValidatorParam('eMailTitle', 'maxLength') || 36,
    )
    @Transform(trimTransformer)
    eMailTitle: string;

    @ValidateNested()
    @Type(() => MailContentDTO)
    content: MailContentDTO;

    @IsArray()
    @IsEmail({}, { each: true })
    eMails: string[];

    @IsString()
    @Length(
        getCampaignValidatorParam('manager', 'minLength') || 4,
        getCampaignValidatorParam('manager', 'maxLength') || 36,
    )
    @Transform(trimTransformer)
    manager: string;

    @IsArray()
    @IsString({ each: true })
    @Transform(
        ({ value }) =>
            (value as string[]).map((value: string) =>
                trimTransformer({ value }),
            ),
        {
            toClassOnly: true,
        },
    )
    employees: string[];
}
