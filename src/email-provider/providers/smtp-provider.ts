import { createTransport } from "nodemailer";
import { MailProvider } from "../types/email-provider.interface";
import { smtpConfig } from "./config/smtp.config";

export class SmtpProvider implements MailProvider {
  private transporter;

  constructor() {
    this.transporter = createTransport(smtpConfig);
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: smtpConfig.email,
      to,
      subject,
      text,
    });
  }
}