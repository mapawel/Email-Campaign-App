import { Test, TestingModule } from '@nestjs/testing';
import { TemplateController } from '../template.controller';
import { TemplateService } from 'src/template/services/template.service';
import { TemplateControllerSpecSetup } from './templateControllerSpec.setup';

describe('TemplateController test suit:', () => {
    let templateController: TemplateController;
    let templateService: TemplateService;
    let setup: TemplateControllerSpecSetup;

    beforeEach(async () => {
        setup = new TemplateControllerSpecSetup();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TemplateController],
            providers: [
                {
                    provide: TemplateService,
                    useValue: setup.mockedServiceMethods,
                },
            ],
        }).compile();

        templateController = module.get<TemplateController>(TemplateController);

        templateService = module.get<TemplateService>(TemplateService);
    });

    it('templateController should be defined', () => {
        expect(templateController).toBeDefined();
    });

    it('templateService should be defined', () => {
        expect(templateService).toBeDefined();
    });

    describe('getTemplates() test:', () => {
        it('should return templates array', async () => {
            // given
            const serviceGetAllTemplatesSpy = jest.spyOn(
                templateService,
                'getAllTemplates',
            );

            // when
            const result = await templateController.getTemplates();

            //then
            expect(result).toEqual([setup.exampleMockResponseTemplate]);
            expect(serviceGetAllTemplatesSpy).toBeCalledTimes(1);
        });
    });

    describe('getTemplateById() test:', () => {
        it('should return template', async () => {
            // given
            const serviceGetTemplateByIdSpy = jest.spyOn(
                templateService,
                'getTemplateById',
            );

            // when
            const result = await templateController.getTemplateById(1);

            //then
            expect(result).toEqual(setup.exampleMockResponseTemplate);
            expect(serviceGetTemplateByIdSpy).toBeCalledTimes(1);
        });
    });

    describe('createTemplate() test:', () => {
        it('should return template', async () => {
            // given
            const serviceCreateTemplateSpy = jest.spyOn(
                templateService,
                'createTemplate',
            );

            // when
            const result = await templateController.createTemplate(
                setup.exampleMockCreateTemplate,
            );

            //then
            expect(result).toEqual(setup.exampleMockResponseTemplate);
            expect(serviceCreateTemplateSpy).toBeCalledTimes(1);
        });
    });

    describe('updateTemplate() test:', () => {
        it('should return template', async () => {
            // given
            const serviceUpdateTemplateSpy = jest.spyOn(
                templateService,
                'updateTemplate',
            );

            // when
            const result = await templateController.updateTemplate(
                1,
                setup.exampleMockUpdateTemplate,
            );

            //then
            expect(result).toEqual(setup.exampleMockResponseTemplate);
            expect(serviceUpdateTemplateSpy).toBeCalledTimes(1);
        });
    });

    describe('deleteTemplate() test:', () => {
        it('should return void', async () => {
            // given
            const serviceDeleteTemplateSpy = jest.spyOn(
                templateService,
                'deleteTemplate',
            );

            // when
            const result = await templateController.deleteTemplate(1);

            //then
            expect(result).toStrictEqual(true);
            expect(serviceDeleteTemplateSpy).toBeCalledTimes(1);
        });
    });
});
