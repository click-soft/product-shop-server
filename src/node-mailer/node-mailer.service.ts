import * as mailer from 'nodemailer';
import { promises } from 'fs';
import * as util from 'util';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const inLineCss = require('nodemailer-juice');

type ChangePasswordArgs = {
  userId: string;
  email: string;
  token: string;
};

@Injectable()
export class NodeMailerService {
  constructor(private configService: ConfigService) {}

  private getTransporter() {
    const service = this.configService.get<string>('SMTP_SERVICE');
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT');
    const user = this.configService.get<string>('SMTP_AUTH_USER');
    const pass = this.configService.get<string>('SMTP_AUTH_PASS');

    const transporter = mailer.createTransport({
      service,
      host, // SMTP 서버명
      port, // SMTP 포트
      auth: {
        user,
        pass,
      },
    });
    transporter.use('compile', inLineCss());

    return transporter;
  }

  private async getHtml(args: ChangePasswordArgs) {
    const url = `https://www.click-soft.shop/change-password?uid=${args.userId}&key=${args.token}`;
    const data = await promises.readFile(
      './src/node-mailer/change-password.html',
    );
    const html = data.toString().replaceAll('@change-password-url', url);
    return html;
  }

  private async getMailOptions(args: ChangePasswordArgs) {
    const user = this.configService.get<string>('SMTP_AUTH_USER');
    const html = await this.getHtml(args);
    const mailOptions = {
      from: user, // 네이버 아이디
      to: args.email, // 수신자 아이디
      subject: '클릭소프트Shop 비밀번호 변경',
      html,
    };

    return mailOptions;
  }

  async sendChangePasswordEmail(args: ChangePasswordArgs) {
    const transporter = this.getTransporter();

    try {
      const sendMailAsync = util
        .promisify(transporter.sendMail)
        .bind(transporter);
      const mailOptions = await this.getMailOptions(args);
      const info = await sendMailAsync(mailOptions);
      transporter.close();
      return args.email;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export default NodeMailerService;
