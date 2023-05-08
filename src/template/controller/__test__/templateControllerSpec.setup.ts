import { TemplateCreateDTO } from 'src/template/dto/templateCreate.dto';
import { TemplateResDTO } from 'src/template/dto/templateRes.dto';

export class TemplateControllerSpecSetup {
    public exampleMockCreateTemplate: TemplateCreateDTO = {
        name: 'test name',
        description: 'test description',
        createdBy: 'idOfCreator',
        createdAt: new Date(Date.now()),
        fileId: 'fileId',
    };

    public exampleMockResponseTemplate: TemplateResDTO = {
        id: 1,
        name: 'test name',
        description: 'test description',
        createdBy: 'idOfCreator',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        updatedBy: 'idOfUpdater',
        campaigns: [],
        fileId: 'fileId',
    };

    public mockedServiceMethods = {
        getAllTemplates: jest.fn(() => [this.exampleMockResponseTemplate]),
        getTemplateById: jest.fn(() => this.exampleMockResponseTemplate),
        createTemplate: jest.fn(() => this.exampleMockResponseTemplate),
        updateTemplate: jest.fn(() => this.exampleMockResponseTemplate),
        deleteTemplate: jest.fn(() => true),
    };
}
