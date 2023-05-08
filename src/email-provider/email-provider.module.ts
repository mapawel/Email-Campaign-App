import { Module } from '@nestjs/common';
import { EmailProviderService } from './mail-provider.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [EmailProviderService],
})
export class EmailProviderModule {}
