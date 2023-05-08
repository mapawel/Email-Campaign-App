import { Injectable } from '@nestjs/common';
import { MailProvider } from './types/email-provider.interface';
import { MailgunProvider } from './providers/mailgun-provider';
import { HttpService } from '@nestjs/axios';
import { SmtpProvider } from './providers/smtp-provider';
import { SendGridProvider } from './providers/sendgrid-provider';

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
    ) {
        const provider = this.providers.get(providerName);
        if (provider) {
            await provider.sendMail(to, subject, text);
        }
    }
}
