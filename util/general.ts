export function delay(ms?: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms || 0 /* Default: 0ms */);
    });
}

export const nil = undefined;
