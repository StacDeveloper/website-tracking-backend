

let auth: any;

export const getAuth = async () => {
    if (!auth) {
        const { betterAuth } = await import('better-auth');
        const { prismaAdapter } = await import('better-auth/adapters/prisma');
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient()
        auth = betterAuth({
            database: prismaAdapter(prisma, { provider: "postgresql" }),
            baseURL: process.env.BETTER_AUTH_URL!,
            trustedOrigins: [process.env.FRONTEND_URL!],
            socialProviders: {
                google: {
                    clientId: process.env.GOOGLE_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                },
                github: {
                    clientId: process.env.GITHUB_CLIENT_ID!,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                },
                discord: {
                    clientId: process.env.DISCORD_CLIENT_ID!,
                    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
                },
            }
        })
    }
    return auth

}