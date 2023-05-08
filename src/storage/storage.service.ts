import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import {
    createReadStream,
    createWriteStream,
    promises as fsPromises,
    write,
} from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StorageService {
    private readonly storage: string;
    private readonly HTML_EXTENSION = 'html';
    private readonly XML_EXTENSION = 'xml';

    constructor(private readonly configService: ConfigService<string, true>) {
        this.storage = this.configService.get<string>('STORAGE', {
            infer: true,
        });
    }

    saveFile = async (file: Express.Multer.File): Promise<string> => {
        const fileId: string = uuid();
        const fileExtension: string = file.mimetype.includes(
            this.HTML_EXTENSION,
        )
            ? this.HTML_EXTENSION
            : this.XML_EXTENSION;

        const filePath = join(
            process.cwd(),
            this.storage,
            `${fileId}.${fileExtension}`,
        );

        const writeableStream = createWriteStream(filePath);

        writeableStream.write(file.buffer);
        writeableStream.end();

        return fileId;
    };

    readFile = async (name: string): Promise<string> => {
        const dir: string = join(process.cwd(), this.storage);

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
