import { Injectable } from '@nestjs/common';
import { MailProvider } from './types/email-provider.interface';
import { MailgunProvider } from './providers/mailgun-provider';
import { SmtpProvider } from './providers/smtp-provider';
import { SendGridProvider } from './providers/sendgrid-provider';
import {
    MailgunConfig,
    SendgridConfig,
    SmtpConfig,
} from './types/provider-config.interface';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class EmailProviderService {
    private providers = new Map<string, MailProvider>();

    constructor(private readonly storage: StorageService) {
        this.providers.set('mailgun', new MailgunProvider(storage)),
            this.providers.set('smtp', new SmtpProvider(storage));
        this.providers.set('sendgrid', new SendGridProvider(storage));
    }

    async sendMail(
        from: string,
        to: string,
        subject: string,
        template: string,
        providerName: string,
        providerConfig: MailgunConfig | SendgridConfig | SmtpConfig,
    ) {
        const provider = this.providers.get(providerName);

        if (provider) {
            switch (providerName) {
                case 'mailgun':
                    await provider.sendMail(
                        from,
                        to,
                        subject,
                        template,
                        providerConfig,
                    );
                    break;
                case 'smtp':
                    await provider.sendMail(
                        from,
                        to,
                        subject,
                        template,
                        providerConfig,
                    );
                    break;
                case 'sendgrid':
                    await provider.sendMail(
                        from,
                        to,
                        subject,
                        template,
                        providerConfig,
                    );
                    break;
                default:
                    throw new Error('Invalid provider name');
            }
        }
    }
}
