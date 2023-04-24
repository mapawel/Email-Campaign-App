import { Module } from '@nestjs/common';
import { dbProviders } from './providers/db.provider';

@Module({
    providers: [...dbProviders],
    exports: [...dbProviders],
})
export class DBModule {}
