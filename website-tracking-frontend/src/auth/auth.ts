import { createAuthClient } from "better-auth/react"
const url = process.env.NEXT_PUBLIC_BACKEND_URL! as string
if(!url) throw new Error("Url does not exist");
export const authClient = createAuthClient({
    baseURL: url,
    fetchOptions: { credentials: "include" }
})

export const { signIn, signOut, signUp, useSession } = authClient