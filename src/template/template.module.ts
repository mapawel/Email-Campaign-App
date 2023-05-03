import { Module } from '@nestjs/common';
import { TemplateController } from './controller/template.controller';
import { TemplateService } from './services/template.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
