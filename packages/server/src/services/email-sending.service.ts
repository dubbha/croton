import nodemailer from 'nodemailer';

import { Pages } from '../constants/pages';
import { QueryParams } from '../constants/query-params';
import {createActivationEmail} from "../utils/create-activation-email";

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

  public async sendActivationMessage(userEmail: string, name: string, host: string, emailVerificationToken: string): Promise<void> {
    const link = `${host}${Pages.EMAIL_CONFIRMATION_PAGE}?${QueryParams.EMAIL_VERIFICATION_TOKEN}=${emailVerificationToken}`;
    const mailOptions = {
      to: userEmail,
      subject: 'Please confirm your email account',
      html: createActivationEmail(name, link)
    };

    await this.sendEmail(mailOptions);
  }
}