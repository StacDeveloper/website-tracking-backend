export function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T) {
    return Promise.race([promise, new Promise((res) => setTimeout(() => res(fallback), ms))])
}