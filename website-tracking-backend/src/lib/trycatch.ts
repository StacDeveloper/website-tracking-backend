import { RequestHandler } from "@nestjs/common/interfaces"

export const TryCatch = function (handler) {
    return async () => {
        try {
            await handler()
        } catch (error) {
            console.log(error)
        }
    }
}