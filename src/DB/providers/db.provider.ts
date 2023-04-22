import { DataSource } from 'typeorm';
import { DBProviderType } from './db-provider.type';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBProvider {
  constructor(private configService: ConfigService) {}

  public getDBProvider(): DBProviderType {
    return {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: this.configService.get('POSTGRES_HOST'),
          port: this.configService.get('POSTGRES_PORT'),
          username: this.configService.get('POSTGRES_USER'),
          password: this.configService.get('POSTGRES_PASSWORD'),
          database: this.configService.get('POSTGRES_DB'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        });

        return dataSource.initialize();
      },
    };
  }
}
