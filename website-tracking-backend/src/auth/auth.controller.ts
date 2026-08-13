import { All, Controller, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node"
import { auth } from "./auth";


@Controller("/api/auth")
export class AuthController {
    private handler = toNodeHandler(auth)

    @All("*")
    async handleAuth(@Req() req: Request, @Res() res: Response) {
        return this.handler(req, res)
    }
}