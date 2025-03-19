import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import * as path from "node:path"
import * as fs from "node:fs"

export const multerConfig = {
    storage: diskStorage({
        destination(req: any, file, callback) {
            const { id } = req.user
            const basePath = path.join(process.cwd(), "src/uploads")
            const extensions = [".jpeg", ".jpg", ".png"]

            const fileExt = extensions.find(ext => fs.existsSync(basePath + `${id}${ext}`))
            if (fileExt) fs.unlinkSync(path.join(basePath, `${id}${fileExt}`));
            return callback(null, basePath)
        },

        filename(req: any, file, callback) {
            const { id } = req.user;
            const fileExt = path.extname(file.originalname);
            const fileName = `${id}${fileExt}`;
            callback(null, fileName);
        },
    }),

    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req: Request, file: any, callback: any) {
        if (!file) return callback(null, true);

        const types = ["image/png", "image/jpeg", "image/jpg"];

        if (!types.includes(file.mimetype)) {
            const exts = types.map(type => type.split("/")[1]).join(", ");
            return callback(new BadRequestException(`Acceptable file extensions are ${exts}`), false);
        }

        return callback(null, true);
    }
}