export function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((resolve) => setTimeout(() => {
            console.log("TIMEOUT FIRED after", ms, "ms");
            resolve(fallback);
        }, ms)),
    ]);
}