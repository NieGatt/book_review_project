import { Injectable } from "@nestjs/common";
import hbs from "handlebars"
import * as fs from "node:fs"
import * as path from "node:path"

@Injectable()
export class TemplateHandler {
    compile(token: string) {
        const templatePath = path.resolve("src/helpers/templates/reset-password.hbs")
        const templateFile = fs.readFileSync(templatePath, "utf-8")
        const template = hbs.compile(templateFile)
        return template({ token })
    }
}