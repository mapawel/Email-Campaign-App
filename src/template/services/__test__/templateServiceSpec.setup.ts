import { TemplateCreateDTO } from 'src/template/dto/templateCreate.dto';

export class TemplateServiceSpecSetup {
    public exampleMockTemplate: TemplateCreateDTO = {
        name: 'test name',
        description: 'test description',
        createdBy: 'idOfCreator',
        createdAt: new Date(Date.now()),
        fileId: 'fileId',
    };

    public mockedRepositoryMethods = {
        find: jest.fn(() => [
            {
                id: 1,
                ...this.exampleMockTemplate,
            },
        ]),
        findOne: jest.fn(() => ({
            id: 1,
            ...this.exampleMockTemplate,
        })),
        create: jest.fn((x) => ({
            id: 1,
            ...x,
        })),
        save: jest.fn((x) => ({
            id: 1,
            ...x,
        })),
        update: jest.fn((x) => ({
            affected: 1,
        })),
        delete: jest.fn((x) => ({
            affected: 1,
        })),
    };
}
