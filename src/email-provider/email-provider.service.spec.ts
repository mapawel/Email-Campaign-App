import { Test, TestingModule } from '@nestjs/testing';
import { EmailProviderService } from './mail-provider.service';
import { StorageService } from 'src/storage/storage.service';

describe('EmailProviderService', () => {
    let service: EmailProviderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmailProviderService,
                {
                    provide: StorageService,
                    useValue: {
                        readFile: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EmailProviderService>(EmailProviderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
