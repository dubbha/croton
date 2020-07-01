import nodemailer from 'nodemailer';

import {Pages} from 'core/constants/pages';
import {QueryParams} from 'core/constants/query-params';

export default class EmailSendingService {
  public async sendEmail(mailOptions: Record<string, unknown>): Promise<void> {
    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_USER,
      EMAIL_PASS
    } = process.env;

    const smtpTransport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    try {
      await smtpTransport.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  public async sendActivationMessage(userEmail: string, host: string, emailVerificationToken: string): Promise<void> {
    const link = `${host}${Pages.EMAIL_CONFIRMATION_PAGE}?${QueryParams.EMAIL_VERIFICATION_TOKEN}=${emailVerificationToken}`;
    const mailOptions = {
      to: userEmail,
      subject: 'Please confirm your email account',
      html: `
        Hello,<br> Please Click on the link to verify your email.
        Verification link expires in ${process.env.EMAIL_VERIFICATION_EXPIRATION_TIME} hours.
        <br><a href="${link}">Click here to verify</a>
      `
    };

    await this.sendEmail(mailOptions);
  }
}