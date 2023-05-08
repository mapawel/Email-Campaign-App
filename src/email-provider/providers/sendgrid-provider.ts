import { HttpService } from '@nestjs/axios';
import { MailProvider } from '../types/email-provider.interface';
import { sendgridConfig } from './config/sengrid.config';

export class SendGridProvider implements MailProvider {
    constructor(private httpService: HttpService) {}

    async sendMail(to: string, subject: string, text: string) {
        const data = {
            personalizations: [
                {
                    to: [{ email: to }],
                    subject,
                },
            ],
            from: { email: sendgridConfig.email },
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
                    Authorization: `Bearer ${sendgridConfig.apiKey}`,
                },
            })
            .toPromise();
    }
}
