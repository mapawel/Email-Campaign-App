import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '../storage.service';
import { ConfigService } from '@nestjs/config';
import { Logger, StreamableFile } from '@nestjs/common';
import { MainExceptionFilter } from 'src/app-exception-filters/main-exception.filter';
import * as fs from 'fs';
import { log } from 'console';
import path from 'path';
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
const mockRequest = {};

jest.mock('uuid', () => ({ v4: jest.fn(() => 'id_name') }));

jest.mock('fs', () => ({
    createWriteStream: jest.fn(),
    createReadStream: jest.fn(),
    readdir: jest.fn(),
}));

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
                        get: jest.fn(),
                    },
                },
                {
                    provide: Logger,
                    useValue: {
                        error: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<StorageService>(StorageService);
        config = module.get<ConfigService>(ConfigService);
        filter = module.get<MainExceptionFilter>(MainExceptionFilter);

        jest.clearAllMocks();
    });

    describe('readFile', () => {
        // it('should return the content of the file', async () => {
        //     //given
        //     const fileName = 'id.html';
        //     const contentInFile = 'Hello World';
        //     jest.spyOn(config, 'get').mockReturnValueOnce(
        //         'src/storage/__tests__/test',
        //     );
        //     jest.spyOn(fs, 'readdir').mockImplementation(() => [fileName]);
        //     const mReadStream = {
        //         pipe: jest.fn().mockReturnThis(),
        //         on: jest.fn().mockImplementation(function (event, handler) {
        //           handler();
        //           return this;
        //         }),
        //       };
        //     jest.spyOn(fs, 'createReadStream').mockReturnValueOnce(mReadStream);

        //     //when
        //     const readStream: fs.ReadStream = await service.readFile(fileName);
        //     const fileContents: string = await new Promise((resolve, reject) => {
        //         let buffer = '';
        //         readStream.on('data', (data: string) => {
        //           buffer += data;
        //         });
        //         readStream.on('end', () => {
        //           resolve(buffer);
        //         });
        //         readStream.on('error', (err: any) => {
        //           reject(err);
        //         });
        //       });

        //     //then
        //     expect(fileContents).toEqual(contentInFile);
        // });

        it('should throw error, when file not existing', async () => {
            const fileName = 'notExistingFile.txt';
            jest.spyOn(config, 'get').mockReturnValueOnce(
                'src/storage/__tests__/test',
            );
            jest.spyOn(fs, 'readdir').mockImplementation(() => []);

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

                expect(mockResponse.status).toHaveBeenCalledWith(500);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Ups... Something went wrong. Try again later.',
                });
            }
        });

        it('should throw error, when something wrong with env or config service', async () => {
            const fileName = 'notExistingFile.txt';
            jest.spyOn(config, 'get').mockReturnValueOnce(undefined);

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

                expect(mockResponse.status).toHaveBeenCalledWith(500);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Ups... Something went wrong. Try again later.',
                });
            }
        });
    });

    describe('writeFile', () => {
        it('should write file successfully', async () => {
            //given
            const fileId = 'id_name';
            const file = {
                buffer: Buffer.from('testing'),
                mimetype: 'application/html',
            } as unknown as Express.Multer.File;
            const writeStream: fs.WriteStream = {
                write: jest.fn(),
            } as unknown as fs.WriteStream;
            jest.spyOn(config, 'get').mockImplementation(
                () => 'src/storage/__tests__/test',
            );

            jest.spyOn(fs, 'createWriteStream').mockReturnValue(writeStream);

            //when
            const result: string = await service.saveFile(file);

            //then
            expect(result).toEqual(fileId);
        });

        it('should throw InternalServerErrorException when storage not existing', async () => {
            //given
            const file = {
                buffer: Buffer.from('testing'),
            } as unknown as Express.Multer.File;
            jest.spyOn(config, 'get').mockImplementation(() => undefined);

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

        it('should throw InternalServerErrorException when something goes wrong with writhing the file', async () => {
            //given
            const file = {
                buffer: Buffer.from('testing'),
            } as unknown as Express.Multer.File;
            jest.spyOn(config, 'get').mockImplementation(() => undefined);
            jest.spyOn(fs, 'createWriteStream').mockImplementation(() => {
                throw new Error('Can not write the file');
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
