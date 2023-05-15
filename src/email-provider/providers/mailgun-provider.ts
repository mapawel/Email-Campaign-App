import { HttpService } from '@nestjs/axios';
import { MailProvider } from '../types/email-provider.interface';
import { MailgunConfig } from '../types/provider-config.interface';

export class MailgunProvider implements MailProvider {
    constructor(private httpService: HttpService) {}

    async sendMail(to: string, subject: string, text: string, config: MailgunConfig) {
        const data = {
            from: config.email,
            to,
            subject,
            text,
        };
        const auth = `api:${config.apiKey}`;
        const encodedAuth = Buffer.from(auth).toString('base64');
        await this.httpService
            .post(
                `https://api.mailgun.net/v3/${config.domain}/messages`,
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
