import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '../storage.service';
import { ConfigService } from '@nestjs/config';
import { MainExceptionFilter } from 'src/app-exception-filters/main-exception.filter';
import mock = require('mock-fs');

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
const mockRequest = {};

jest.mock('uuid', () => ({ v4: jest.fn(() => 'test_id') }));

describe('StorageService', () => {
    let service: StorageService;
    let config: ConfigService;
    let filter: MainExceptionFilter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StorageService,
                MainExceptionFilter,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(() => 'src/storage/__tests__/test'),
                    },
                },
            ],
        }).compile();

        service = module.get<StorageService>(StorageService);
        config = module.get<ConfigService>(ConfigService);
        filter = module.get<MainExceptionFilter>(MainExceptionFilter);

        jest.clearAllMocks();
    });

    afterAll(() => {
        mock.restore();
    });

    describe('readFile', () => {
        it('should return the content of the file', async () => {
            const fileName = 'test_id';
            const contentInFile = 'Hello World';
            mock({
                'src/storage/__tests__/test': {
                    [fileName]: contentInFile,
                },
            });

            const readStream = await service.readFile(fileName);

            expect(readStream).toEqual(contentInFile);
        });

        it('should throw error, when file not existing', async () => {
            const fileName = 'notExistingFile.html';
            mock({
                'src/storage/__tests__/test': {},
            });

            //then
            try {
                await service.readFile(fileName);
            } catch (err) {
                filter.catch(err, {
                    switchToHttp: () => ({
                        getRequest: () => mockRequest,
                        getResponse: () => mockResponse,
                    }),
                } as any);

                expect(mockResponse.status).toHaveBeenCalledWith(404);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'File does not exist',
                });
            }
        });
    });

    describe('writeFile', () => {
        it('should write file successfully', async () => {
            // given
            const fileId = 'test_id';
            const file = {
                mimetype: 'text/html',
                buffer: Buffer.from('file contents'),
            } as Express.Multer.File;

            mock({
                'src/storage/__tests__/test': {},
            });

            // when
            const result = await service.saveFile(file);

            // then
            expect(result).toEqual(fileId);
        });

        it('should throw InternalServerErrorException when something goes wrong with writhing the file', async () => {
            //given
            const file = {
                mimetype: 'text/html',
                buffer: Buffer.from('file contents'),
            } as Express.Multer.File;

            jest.spyOn(service, 'saveFile').mockImplementation(() => {
                throw new Error('Something goes wrong with saving the file');
            });

            //then
            try {
                await service.saveFile(file);
            } catch (err) {
                filter.catch(err, {
                    switchToHttp: () => ({
                        getRequest: () => mockRequest,
                        getResponse: () => mockResponse,
                    }),
                } as any);

                expect(mockResponse.status).toHaveBeenCalledWith(500);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Ups... Something went wrong. Try again later.',
                });
            }
        });
    });
});
