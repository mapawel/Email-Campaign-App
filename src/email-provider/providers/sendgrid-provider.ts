import { StorageService } from 'src/storage/storage.service';
import { MailProvider } from '../types/email-provider.interface';
import { SendgridConfig } from '../types/provider-config.interface';
import * as SendGrid from '@sendgrid/mail';

export class SendGridProvider implements MailProvider {
    constructor(private readonly storage: StorageService) {}

    async sendMail(
        from: string,
        to: string,
        subject: string,
        template: string,
        config: SendgridConfig,
    ) {
        const html = await this.storage.readFile(template);

        SendGrid.setApiKey(config.apiKey);

        const mail = {
            from,
            to,
            subject,
            html,
        };
        await SendGrid.send(mail);
    }
}
