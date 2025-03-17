import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"
import "dotenv/config"
import { TemplateHandler } from "./template-handler";

@Injectable()
export class SendEmailHandler {
    constructor(private templateHandler: TemplateHandler) { }

    private config() {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    async send(email: string, token: string) {
        const template = this.templateHandler.compile(token)
        const transporter = this.config()
        
        await transporter.sendMail({
            from: "itbreaksfast@gmail.com",
            to: email,
            html: template
        })
    }
}