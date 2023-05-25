import { TemplateCreateDTO } from './templateCreate.dto';
import { PartialType } from '@nestjs/mapped-types';

export class TemplateUpdateDTO extends PartialType(TemplateCreateDTO) {}
