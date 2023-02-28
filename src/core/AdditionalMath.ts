export const clamp = (num: number, min: number, max: number): number =>
    Math.min(Math.max(num, min), max)

export const degreeToRad = (deg: number): number =>
    deg * Math.PI / 180;

export const radToDegree = (rad: number): number =>
    rad * 180 / Math.PI;
