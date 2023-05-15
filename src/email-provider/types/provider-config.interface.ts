export interface MailgunConfig {
    apiKey: string;
    domain: string;
    email: string;
}

export interface SengridConfig {
    apiKey: string;
    email: string;
}

export interface SmtpConfig {
    host: string;
    port: 587;
    secure: false;
    auth: SmtpAuth;
    email: string;
}

type SmtpAuth = {
    user: string;
    pass: string;
}
