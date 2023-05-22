import { Module } from '@nestjs/common';
import { EmailProviderService } from './mail-provider.service';
import { HttpModule } from '@nestjs/axios';
import { StorageService } from 'src/storage/storage.service';

@Module({
    imports: [StorageService],
    providers: [EmailProviderService],
})
export class EmailProviderModule {}
