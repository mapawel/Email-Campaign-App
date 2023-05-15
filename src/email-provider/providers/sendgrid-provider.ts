import { HttpService } from '@nestjs/axios';
import { MailProvider } from '../types/email-provider.interface';
import { SengridConfig } from '../types/provider-config.interface';

export class SendGridProvider implements MailProvider {
    constructor(private httpService: HttpService) {}

    async sendMail(to: string, subject: string, text: string, config: SengridConfig) {
        const data = {
            personalizations: [
                {
                    to: [{ email: to }],
                    subject,
                },
            ],
            from: { email: config.email },
            content: [
                {
                    type: 'text/plain',
                    value: text,
                },
            ],
        };
        await this.httpService
            .post(`https://api.sendgrid.com/v3/mail/send`, data, {
                headers: {
                    Authorization: `Bearer ${config.apiKey}`,
                },
            })
            .toPromise();
    }
}
