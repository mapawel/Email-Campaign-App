import { IsString, IsDateString, Length } from 'class-validator';
import validators from '../../validation/settings/validators.json';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';

const getTemplateValidatorParam =
    buildValidatorKeyParamsGetter<TemplateCreateDTO>({
        entityName: 'template',
        validatorsObject: validators,
    });

export class TemplateCreateDTO {
    @IsString()
    @Length(
        getTemplateValidatorParam('name', 'minLength') || 4,
        getTemplateValidatorParam('name', 'maxLength') || 36,
    )
    name: string;

    @IsString()
    @Length(
        getTemplateValidatorParam('description', 'minLength') || 4,
        getTemplateValidatorParam('description', 'maxLength') || 36,
    )
    description: string;

    @IsString()
    @Length(
        getTemplateValidatorParam('fileId', 'minLength') || 4,
        getTemplateValidatorParam('fileId', 'maxLength') || 36,
    )
    fileId: string;
}
