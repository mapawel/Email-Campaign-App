import { PartialType } from '@nestjs/mapped-types';
import { TemplateCreateDTO } from './templateCreate.dto';

export class TemplateUpdateDTO extends PartialType(TemplateCreateDTO) {}
