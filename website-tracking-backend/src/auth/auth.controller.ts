import { All, Controller, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node"
import { getAuth } from "./auth";


@Controller("/api/auth")
export class AuthController {


    @All("*")
    async handleAuth(@Req() req: Request, @Res() res: Response) {
        const auth = await getAuth()
        const handler = toNodeHandler(auth)
        return handler(req, res)
    }
}