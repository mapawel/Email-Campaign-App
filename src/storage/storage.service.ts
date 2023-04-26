import {
    Injectable,
    InternalServerErrorException,
    Logger,
    LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ReadStream,
    WriteStream,
    createReadStream,
    createWriteStream,
} from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class StorageService {
    constructor(private readonly configService: ConfigService) {}

    async saveFile(file: Express.Multer.File): Promise<string> {
        const storage: string | undefined =
            this.configService.get<string>('STORAGE');

        if (!storage) {
            throw new Error('Something wrong with env or config service');
        }

        const fileId: string = uuid();
        const fileExtension: string = file.mimetype.includes('html')
            ? 'html'
            : 'xml';
        const writeStream: WriteStream = createWriteStream(
            join(process.cwd(), `${storage}/${fileId}.${fileExtension}`),
        );
        writeStream.write(file);

        return fileId;
    }

    async readFile(name: string): Promise<ReadStream> {
        const storage: string | undefined =
            this.configService.get<string>('STORAGE');

        if (!storage) {
            throw new Error('Something wrong with env or config service');
        }

        let filePath: string = '';
        const dir: string = join(process.cwd(), `${storage}`);
        const files = await readdir(dir);

        for (const file of files) {
            if (file.includes(name)) {
                filePath = join(dir, name);
                break;
            }
        }

        if (filePath === '') {
            throw new Error('File does not exist');
        }

        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(filePath);
            readStream.on('error', (error) => reject(error));
            readStream.on('end', () => resolve(readStream));
        });
    }
}
