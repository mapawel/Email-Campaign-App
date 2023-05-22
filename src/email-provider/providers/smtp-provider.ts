import { createTransport } from 'nodemailer';
import { MailProvider } from '../types/email-provider.interface';
import { SmtpConfig } from '../types/provider-config.interface';
import Mail from 'nodemailer/lib/mailer';
import { StorageService } from 'src/storage/storage.service';

export class SmtpProvider implements MailProvider {
    private transporter: Mail;

    constructor(private readonly storage: StorageService) {}

    async sendMail(
        from: string,
        to: string,
        subject: string,
        template: string,
        config: SmtpConfig,
    ) {
        const html = await this.storage.readFile(template);

        this.transporter = createTransport(config);

        const mailOptions = {
            from,
            to,
            subject,
            html,
        };
        await this.transporter.sendMail(mailOptions);
    }
}
