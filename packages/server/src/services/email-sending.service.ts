import nodemailer from 'nodemailer';

import { Pages } from '../constants/pages';
import { QueryParams } from '../constants/query-params';
import { createActivationEmail } from '../utils/create-activation-email';
import { createPasswordResetEmail } from '../utils/create-password-reset-email';
import { createEmailResetEmail } from '../utils/create-email-reset-email';
import {
  createShelfInvitationEmail,
  createShelfInvitationEmailUnknownUser,
} from '../utils/create-shelf-invitation-email';

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

  public async sendActivationMessage(
    userEmail: string,
    name: string,
    host: string,
    emailVerificationToken: string
  ): Promise<void> {
    const link = `${host}${Pages.EMAIL_CONFIRMATION_PAGE}?${QueryParams.EMAIL_VERIFICATION_TOKEN}=${emailVerificationToken}`;
    const mailOptions = {
      to: userEmail,
      subject: 'Please confirm your email account',
      html: createActivationEmail(name, link)
    };

    await this.sendEmail(mailOptions);
  }

  public async sendPasswordResetMessage(
    userEmail: string,
    name: string,
    host: string,
    passwordResetToken: string,
  ): Promise<void> {
    const link = `${host}${Pages.PASSWORD_RESET_PAGE}?${QueryParams.PASSWORD_RESET_TOKEN}=${passwordResetToken}`;
    const mailOptions = {
      to: userEmail,
      subject: 'You are about to change your password',
      html: createPasswordResetEmail(name, link)
    };

    await this.sendEmail(mailOptions);
  }

  public async sendEmailResetMessage(
    userEmail: string,
    name: string,
    host: string,
    emailResetToken: string,
  ): Promise<void> {
    const link = `${host}${Pages.EMAIL_RESET_PAGE}?${QueryParams.EMAIL_RESET_TOKEN}=${emailResetToken}`;
    const mailOptions = {
      to: userEmail,
      subject: 'You are about to change your email',
      html: createEmailResetEmail(name, link)
    };

    await this.sendEmail(mailOptions);
  }

  public async sendShelfInvitationMessageUnknownUser(
    userEmail: string,
    host: string,
  ): Promise<void> {
    const link = `${host}${Pages.SIGNUP_PAGE}`;
    const mailOptions = {
      to: userEmail,
      subject: 'You have been invited to take care of a flower shelf',
      html: createShelfInvitationEmailUnknownUser(link)
    };

    await this.sendEmail(mailOptions);
  }

  public async sendShelfInvitationMessage(
    userEmail: string,
    name: string,
    host: string,
    shelfInvitationToken: string,
  ): Promise<void> {
    const link = `${host}${Pages.SHELF_INVITATION_ACCEPT_PAGE}?${QueryParams.SHELF_INVITATION_TOKEN}=${shelfInvitationToken}`;
    const mailOptions = {
      to: userEmail,
      subject: 'You have been invited to take care of a flower shelf',
      html: createShelfInvitationEmail(name, link)
    };

    await this.sendEmail(mailOptions);
  }
}
