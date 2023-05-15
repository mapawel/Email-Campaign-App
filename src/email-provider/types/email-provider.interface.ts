import {
    MailgunConfig,
    SengridConfig,
    SmtpConfig,
} from './provider-config.interface';

export interface MailProvider {
    sendMail(
        to: string,
        subject: string,
        text: string,
        providerConfig: MailgunConfig | SengridConfig | SmtpConfig,
    ): Promise<void>;
}
