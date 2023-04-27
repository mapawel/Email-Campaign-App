import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    createReadStream,
    createWriteStream,
    promises as fsPromises,
    write,
} from 'fs';
import { join } from 'path';
import { Stream } from 'stream';
import { promisify } from 'util';
import { v4 as uuid } from 'uuid';

const pipeline = promisify(Stream.pipeline);

@Injectable()
export class StorageService {
    private readonly storage: string | undefined;
    private readonly html = 'html';
    private readonly xml = 'xml';

    constructor(private readonly configService: ConfigService) {
        this.storage = this.configService.get<string>('STORAGE');
        if (!this.storage) {
            throw new Error('Something wrong with env or config service');
        }
    }

    saveFile = async (file: Express.Multer.File): Promise<string> => {
        const fileId: string = uuid();
        const fileExtension: string = file.mimetype.includes(this.html)
            ? this.html
            : this.xml;

        const filePath = join(
            process.cwd(),
            `${this.storage}/${fileId}.${fileExtension}`,
        );

        const writeableStream = createWriteStream(filePath);

        writeableStream.write(file.buffer);
        writeableStream.end();

        return fileId;
    };

    readFile = async (name: string): Promise<string> => {
        const dir: string = join(process.cwd(), `${this.storage}`);
        const files = await fsPromises.readdir(dir);

        const foundFile = files.find((file) => file.includes(name));

        if (!foundFile) {
            throw new NotFoundException('File does not exist');
        }

        const fullPath = join(dir, foundFile);

        return this.getFileContent(fullPath);
    };

    private getFileContent = (fullPath: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const readStream = createReadStream(fullPath, 'utf-8');
            let content = '';
            readStream.on('data', (chunk) => {
                content += chunk;
            });
            readStream.on('error', (error) => {
                reject(error);
            });
            readStream.on('end', () => {
                resolve(content);
            });
        });
    };
}
