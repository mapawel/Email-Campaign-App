import { TemplateCreateDTO } from './templateCreate.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDateString, Length } from 'class-validator';
import validators from '../../validation/settings/validators.json';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';

const getTemplateValidatorParam =
    buildValidatorKeyParamsGetter<TemplateUpdateDTO>({
        entityName: 'template',
        validatorsObject: validators,
    });

export class TemplateUpdateDTO extends PartialType(TemplateCreateDTO) {
    @IsDateString()
    updatedAt: Date;

    @IsString()
    @Length(
        getTemplateValidatorParam('updatedBy', 'minLength') || 4,
        getTemplateValidatorParam('updatedBy', 'maxLength') || 36,
    )
    updatedBy: string;
}
