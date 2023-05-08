import { TemplateCreateDTO } from './templateCreate.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDateString, Length } from 'class-validator';
import validators from '../../validation/settings/validators.json';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';

const getTemplateValidatorParam =
    buildValidatorKeyParamsGetter<TemplateCreateDTO>({
        entityName: 'template',
        validatorsObject: validators,
    });

export class TemplateUpdateDTO extends PartialType(TemplateCreateDTO) {
    @IsDateString()
    updatedAt: Date;

    @IsString()
    @Length(
        getTemplateValidatorParam('createdBy', 'minLength') || 4,
        getTemplateValidatorParam('createdBy', 'maxLength') || 36,
        // getTemplateValidatorParam('', 'maxLength') || 36,
    )
    updatedBy: string;
}
