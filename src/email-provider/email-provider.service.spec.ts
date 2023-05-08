import { Test, TestingModule } from '@nestjs/testing';
import { EmailProviderService } from './mail-provider.service';
import { HttpService } from '@nestjs/axios';
import { mockDeep } from 'jest-mock-extended';

describe('EmailProviderService', () => {
    let service: EmailProviderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmailProviderService,
                {
                    provide: HttpService,
                    useValue: mockDeep<HttpService>(),
                },
            ],
        }).compile();

        service = module.get<EmailProviderService>(EmailProviderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
