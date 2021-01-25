import Config from './constants';

export function complete_with_default<T>(a: T, v: T): T {
    for (let i in v) {
        if (a[i] === undefined || a[i] === null) {
            a[i] = v[i];
        }
    }
    return a;
};

export function random_positive_negative(): number {
    if (Math.round(Math.random())) { return 1; }
    return -1;
}

export interface CommonEntity {
    x?: number
    y?: number
    xa?: number
    ya?: number
    xl?: number
    yl?: number
};

export function rect_check_crash(a: CommonEntity, b: CommonEntity): boolean {
    let dft: CommonEntity = {
        x: 0, y: 0,
        xl: 0, yl: 0,
        xa: 0, ya: 0,
    };
    complete_with_default(a, dft);
    complete_with_default(b, dft);

    let minAx = Math.min(a.x, a.x + a.xl, a.x + a.xa, a.x + a.xl + a.xa);
    let minBx = Math.min(b.x, b.x + b.xl, b.x + b.xa, b.x + b.xl + b.xa);
    let minAy = Math.min(a.y, a.y + a.yl, a.y + a.ya, a.y + a.yl + a.ya);
    let minBy = Math.min(b.y, b.y + b.yl, b.y + b.ya, b.y + b.yl + b.ya);

    let maxAx = Math.max(a.x, a.x + a.xl, a.x + a.xa, a.x + a.xl + a.xa);
    let maxBx = Math.max(b.x, b.x + b.xl, b.x + b.xa, b.x + b.xl + b.xa);
    let maxAy = Math.max(a.y, a.y + a.yl, a.y + a.ya, a.y + a.yl + a.ya);
    let maxBy = Math.max(b.y, b.y + b.yl, b.y + b.ya, b.y + b.yl + b.ya);

    if (minAx <= maxBx && maxAx >= minBx && minAy <= maxBy && maxAy >= minBy) { return true; }
    return false;
};

export function random_x(): number {
    return Math.random() * Config.board.width;
};

export function random_y(): number {
    return Math.random() * Config.board.height;
};