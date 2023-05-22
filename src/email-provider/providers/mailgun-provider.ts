import { StorageService } from 'src/storage/storage.service';
import { MailProvider } from '../types/email-provider.interface';
import { MailgunConfig } from '../types/provider-config.interface';
import nodemailer from 'nodemailer';
import mailgunTransport = require('nodemailer-mailgun-transport');

export class MailgunProvider implements MailProvider {

    constructor(private readonly storage: StorageService) {}

    async sendMail(
        from: string,
        to: string,
        subject: string,
        template: string,
        config: MailgunConfig,
    ) {

        const html = await this.storage.readFile(template);

        const auth: mailgunTransport.Options = {
            auth: {
                api_key: config.apiKey,
                domain: config.domain,
            },
        };
        const transport: nodemailer.Transporter = nodemailer.createTransport(
            mailgunTransport(auth),
        );

        const mailOptions: nodemailer.SendMailOptions = {
            from,
            to,
            subject,
            html,
        };

        await transport.sendMail(mailOptions);
    }
}
