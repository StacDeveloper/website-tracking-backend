import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { getAuth } from "./auth";

export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlCtx = GqlExecutionContext.create(context)
        const req = gqlCtx.getContext().req;
        const auth = await getAuth()
        const { fromNodeHeaders } = await import("better-auth/node")
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session) throw new UnauthorizedException("Not logged in")
        req.user = session.user
        return true
    }
}