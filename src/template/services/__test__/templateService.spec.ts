import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from '../template.service';
import { Repository } from 'typeorm';
import { Template } from 'src/template/entity/Template.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TemplateServiceSpecSetup } from './templateServiceSpec.setup';
import { TemplateCreateDTO } from 'src/template/dto/templateCreate.dto';
import { TemplateResDTO } from 'src/template/dto/templateRes.dto';

describe('TemplateService test suit', () => {
    let templateService: TemplateService;
    let templateRepository: Repository<Template>;
    let setup: TemplateServiceSpecSetup;

    const TEMPLATE_REPO_TOKEN = getRepositoryToken(Template);

    beforeEach(async () => {
        setup = new TemplateServiceSpecSetup();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TemplateService,
                {
                    provide: TEMPLATE_REPO_TOKEN,
                    useValue: setup.mockedRepositoryMethods,
                },
            ],
        }).compile();

        templateService = module.get<TemplateService>(TemplateService);
        templateRepository =
            module.get<Repository<Template>>(TEMPLATE_REPO_TOKEN);
    });

    it('TemplateService should be defined', () => {
        expect(templateService).toBeDefined();
    });

    it('templateRepository should be defined', () => {
        expect(templateRepository).toBeDefined();
    });

    describe('getAllTemplates() test:', () => {
        it('should return templates array', async () => {
            // given
            const repoFindSpy = jest.spyOn(templateRepository, 'find');

            // when
            const result: TemplateResDTO[] =
                await templateService.getAllTemplates();

            //then
            expect(result).toEqual([
                {
                    id: 1,
                    ...setup.exampleMockTemplate,
                },
            ]);
            expect(repoFindSpy).toBeCalledTimes(1);
        });
    });

    describe('getTemplateById() test:', () => {
        it('should return template', async () => {
            // given
            const repoFindSpy = jest.spyOn(templateRepository, 'findOne');

            // when
            const result: TemplateResDTO =
                await templateService.getTemplateById(1);

            //then
            expect(result).toEqual({
                id: 1,
                ...setup.exampleMockTemplate,
            });
            expect(repoFindSpy).toBeCalledTimes(1);
        });
    });

    describe('createTemplate() test:', () => {
        it('should save to repo template object with id 1', async () => {
            // given
            const repoSaveSpy = jest.spyOn(templateRepository, 'save');
            const exampleMockTemplate: TemplateCreateDTO =
                setup.exampleMockTemplate;

            // when
            const result: TemplateResDTO = await templateService.createTemplate(
                exampleMockTemplate,
            );

            //then
            expect(result).toEqual({
                id: 1,
                ...exampleMockTemplate,
            });
            expect(repoSaveSpy).toBeCalledWith({
                id: 1,
                ...exampleMockTemplate,
            });
        });
    });

    describe('updateTemplate() test:', () => {
        it('should run update and this.getTemplateById with passed Id', async () => {
            // given
            const repoUpdateMock = jest.spyOn(templateRepository, 'update');
            const serviceFindByIdSpy = jest.spyOn(
                templateService,
                'getTemplateById',
            );
            const updatedExampleTempate: TemplateCreateDTO = {
                ...setup.exampleMockTemplate,
                name: 'updated name',
            };
            // when
            await templateService.updateTemplate(1, updatedExampleTempate);

            //then
            expect(repoUpdateMock).toBeCalledTimes(1);
            expect(serviceFindByIdSpy).toBeCalledTimes(1);
        });

        it('should return updated temapte', async () => {
            // given
            const updatedExampleTempate: TemplateCreateDTO = {
                ...setup.exampleMockTemplate,
                name: 'updated name',
            };

            const updatedResTempate: TemplateResDTO = {
                id: 1,
                updatedBy: 'updated by',
                updatedAt: new Date(),
                campaigns: [],
                ...updatedExampleTempate,
            };

            jest.spyOn(
                templateService,
                'getTemplateById',
            ).mockResolvedValueOnce(updatedResTempate);

            // when
            const result: TemplateResDTO = await templateService.updateTemplate(
                1,
                updatedExampleTempate,
            );

            //then
            expect(result).toEqual(updatedResTempate);
        });
    });

    describe('deleteTemplate() test:', () => {
        it('should run delete in templateRepository with passed Id and return true', async () => {
            // given
            const repositoryDeleteSpy = jest.spyOn(
                templateRepository,
                'delete',
            );

            // when
            const result = await templateService.deleteTemplate(1);

            //then
            expect(repositoryDeleteSpy).toBeCalledTimes(1);
            expect(result).toStrictEqual(true);
        });
    });
});
