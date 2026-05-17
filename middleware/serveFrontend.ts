import fs from "fs";
import path from "path";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const serveFrontend = (DIST_PATH: string): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const htmlPath: string = path.join(DIST_PATH, "index.html");

        try {
            if (fs.existsSync(htmlPath)) {
                res.sendFile(htmlPath);
                return;
            }

            res.status(404).json({
                error: "Frontend build not found"
            });
            return;
        } catch (err: unknown) {
            res.status(500).json({
                error: "Error loading frontend"
            });
            return;
        }
    };
};