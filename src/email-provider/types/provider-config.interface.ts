export interface MailgunConfig {
    apiKey: string;
    domain: string | undefined;
}

export interface SendgridConfig {
    apiKey: string;
}

export interface SmtpConfig {
    host: string;
    port: 587;
    secure: false;
    auth: SmtpAuth;
}

type SmtpAuth = {
    user: string;
    pass: string;
};
