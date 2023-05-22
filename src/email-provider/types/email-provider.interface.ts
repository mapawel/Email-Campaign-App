import {
    MailgunConfig,
    SendgridConfig,
    SmtpConfig,
} from './provider-config.interface';

export interface MailProvider {
    sendMail(
        from: string,
        to: string,
        subject: string,
        template: string,
        providerConfig: MailgunConfig | SendgridConfig | SmtpConfig,
    ): Promise<void>;
}
