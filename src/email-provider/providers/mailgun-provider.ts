import { HttpService } from '@nestjs/axios';
import { MailProvider } from '../types/email-provider.interface';
import { mailgunConfig } from './config/mailgun.config';

export class MailgunProvider implements MailProvider {
    constructor(private httpService: HttpService) {}

    async sendMail(to: string, subject: string, text: string) {
        const data = {
            from: mailgunConfig.email,
            to,
            subject,
            text,
        };
        const auth = `api:${mailgunConfig.apiKey}`;
        const encodedAuth = Buffer.from(auth).toString('base64');
        await this.httpService
            .post(
                `https://api.mailgun.net/v3/${mailgunConfig.domain}/messages`,
                data,
                {
                    headers: {
                        Authorization: `Basic ${encodedAuth}`,
                    },
                },
            )
            .toPromise();
    }
}
