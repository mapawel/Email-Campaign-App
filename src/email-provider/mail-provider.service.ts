import { Injectable } from '@nestjs/common';
import { MailProvider } from './types/email-provider.interface';
import { MailgunProvider } from './providers/mailgun-provider';
import { HttpService } from '@nestjs/axios';
import { SmtpProvider } from './providers/smtp-provider';
import { SendGridProvider } from './providers/sendgrid-provider';
import {
    MailgunConfig,
    SengridConfig,
    SmtpConfig,
} from './types/provider-config.interface';

@Injectable()
export class EmailProviderService {
    private providers = new Map<string, MailProvider>();

    constructor(private httpService: HttpService) {
        this.providers.set('mailgun', new MailgunProvider(this.httpService)),
            this.providers.set('smtp', new SmtpProvider());
        this.providers.set('sendgrid', new SendGridProvider(this.httpService));
    }

    async sendMail(
        to: string,
        subject: string,
        text: string,
        providerName: string,
        providerConfig: MailgunConfig | SengridConfig | SmtpConfig,
    ) {
        const provider = this.providers.get(providerName);

        if (provider) {
            switch (providerName) {
                case 'mailgun':
                    await provider.sendMail(to, subject, text, providerConfig);
                    break;
                case 'smtp':
                    await provider.sendMail(to, subject, text, providerConfig);
                    break;
                case 'sendgrid':
                    await provider.sendMail(to, subject, text, providerConfig);
                    break;
                default:
                    throw new Error('Invalid provider name');
            }
        }
    }
}
