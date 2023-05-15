import { createTransport } from 'nodemailer';
import { MailProvider } from '../types/email-provider.interface';
import { SmtpConfig } from '../types/provider-config.interface';
import Mail from 'nodemailer/lib/mailer';

export class SmtpProvider implements MailProvider {
    private transporter: Mail;

    constructor() {}

    async sendMail(
        to: string,
        subject: string,
        text: string,
        config: SmtpConfig,
    ) {
        this.transporter = createTransport(config);
        await this.transporter.sendMail({
            from: config.email,
            to,
            subject,
            text,
        });
    }
}
