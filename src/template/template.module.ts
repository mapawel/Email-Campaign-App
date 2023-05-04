import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entity/Template.entity';
import { TemplateController } from './controller/template.controller';
import { TemplateService } from './services/template.service';

@Module({
    imports: [TypeOrmModule.forFeature([Template])],
    controllers: [TemplateController],
    providers: [TemplateService],
})
export class TemplateModule {}
