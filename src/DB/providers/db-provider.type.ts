import { DataSource } from 'typeorm';

export type DBProviderType = {
  provide: string;
  useFactory: () => Promise<DataSource>;
};
