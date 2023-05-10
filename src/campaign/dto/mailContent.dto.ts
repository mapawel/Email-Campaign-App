import {
    IsString,
    IsArray,
    ValidateNested,
    IsOptional,
    Length,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';
import validators from '../../validation/settings/validators.json';
import { trimTransformer } from '../../validation/utils';

const getContentValidatorParam = buildValidatorKeyParamsGetter<MailContentDTO>({
    entityName: 'mailContent',
    validatorsObject: validators,
});

const getTextsValidatorParam = buildValidatorKeyParamsGetter<ContentBlock>({
    entityName: 'contentBlock',
    validatorsObject: validators,
});

export class MailContentDTO {
    @IsString()
    @Length(
        getContentValidatorParam('logoUrl', 'minLength') || 4,
        getContentValidatorParam('logoUrl', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    logoUrl?: string;

    @IsString()
    @Length(
        getContentValidatorParam('logoAlt', 'minLength') || 4,
        getContentValidatorParam('logoAlt', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    logoAlt?: string;

    @IsString()
    @Length(
        getContentValidatorParam('mainTitle', 'minLength') || 4,
        getContentValidatorParam('mainTitle', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    mainTitle?: string;

    @IsString()
    @Length(
        getContentValidatorParam('subtitle', 'minLength') || 4,
        getContentValidatorParam('subtitle', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    subtitle?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ContentBlock)
    texts: ContentBlock[];

    @IsString()
    @Length(
        getContentValidatorParam('footerLongText', 'minLength') || 4,
        getContentValidatorParam('footerLongText', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    footerLongText?: string;

    @IsString()
    @Length(
        getContentValidatorParam('footerTextLink', 'minLength') || 4,
        getContentValidatorParam('footerTextLink', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    footerTextLink?: string;

    @IsString()
    @Length(
        getContentValidatorParam('footerLinkUrl', 'minLength') || 4,
        getContentValidatorParam('footerLinkUrl', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    footerLinkUrl?: string;

    @IsString()
    @Length(
        getContentValidatorParam('footerLogoUrl', 'minLength') || 4,
        getContentValidatorParam('footerLogoUrl', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    footerLogoUrl?: string;

    @IsString()
    @Length(
        getContentValidatorParam('footerLogoAlt', 'minLength') || 4,
        getContentValidatorParam('footerLogoAlt', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    footerLogoAlt?: string;
}

class ContentBlock {
    @IsString()
    @Length(
        getTextsValidatorParam('title', 'minLength') || 4,
        getTextsValidatorParam('title', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    title?: string;

    @IsString()
    @Length(
        getTextsValidatorParam('subtitle', 'minLength') || 4,
        getTextsValidatorParam('subtitle', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    subtitle?: string;

    @IsString()
    @Length(
        getTextsValidatorParam('text', 'minLength') || 4,
        getTextsValidatorParam('text', 'maxLength') || 96,
    )
    @Transform(trimTransformer)
    text: string;

    @IsString()
    @Length(
        getTextsValidatorParam('linkText', 'minLength') || 4,
        getTextsValidatorParam('linkText', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    linkText?: string;

    @IsString()
    @Length(
        getTextsValidatorParam('linkUrl', 'minLength') || 4,
        getTextsValidatorParam('linkUrl', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    linkUrl?: string;

    @IsString()
    @Length(
        getTextsValidatorParam('imageUrl', 'minLength') || 4,
        getTextsValidatorParam('imageUrl', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    imageUrl?: string;

    @IsString()
    @Length(
        getTextsValidatorParam('imageAlt', 'minLength') || 4,
        getTextsValidatorParam('imageAlt', 'maxLength') || 96,
    )
    @IsOptional()
    @Transform(trimTransformer)
    imageAlt?: string;
}
