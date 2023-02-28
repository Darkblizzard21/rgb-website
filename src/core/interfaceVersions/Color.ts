import {clamp} from "../AdditionalMath";

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

// Color Constructors & Converters

export const hexToColor = (hex: string, alpha: number): Color => {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return {r, g, b, a: alpha}
}

export const componentToHex = (c: number) => {
    let hex = Math.floor(c).toString(16).toUpperCase();
    return hex.length == 1 ? "0" + hex : hex;
}

export const colorToHex = (color: Color) => {
    return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

export const asCssRgbString = (color: Color): string =>
    'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';



export const colorAsArray = (color: Color): [number, number, number, number] => [color.r, color.g, color.b, color.a];
// Color Math

export const multiplyColor = (color: Color, factor: number): Color => {
    let clampedFactor = Math.abs(factor);
    return {
        r: clamp(color.r * clampedFactor, 0, 255),
        g: clamp(color.g * clampedFactor, 0, 255),
        b: clamp(color.b * clampedFactor, 0, 255),
        a: color.a
    }
}
export const multiplyColorUnclamped = (color: Color, factor: number): Color => ({
    r: color.r * factor,
    g: color.g * factor,
    b: color.b * factor,
    a: color.a
})

export const invertColor = (color: Color): Color =>
    ({r: 255 - color.r, g: 255 - color.r, b: 255 - color.b, a: color.a})


export const lerp = (color1: Color, color2: Color, alpha: number): Color => {
    let clampedAlpha = Math.min(Math.max(alpha, 0), 1);
    return lerpUnclamped(color1, color2, clampedAlpha)
}

export const lerpUnclamped = (color1: Color, color2: Color, alpha: number): Color => ({
    r: color1.r + (color2.r - color1.r) * alpha,
    g: color1.g + (color2.g - color1.g) * alpha,
    b: color1.b + (color2.b - color1.b) * alpha,
    a: color1.a + (color2.a - color1.a) * alpha,
})

// Color Utilities

export const get1DCoordinate = (x: number, y: number, width: number): number =>
    width * 4 * y + x * 4;

export const writeColorOnDataArray = (data: Uint8ClampedArray, coordinate: number, color: Color) => {
    data[coordinate] = color.r;
    data[coordinate + 1] = color.g;
    data[coordinate + 2] = color.b;
    data[coordinate + 3] = color.a;
}

export const getColorFromDataArray = (data: Uint8ClampedArray, coordinate: number): Color => ({
    r: data[coordinate],
    g: data[coordinate + 1],
    b: data[coordinate + 2],
    a: data[coordinate + 3]
})

export const withNewAlpha = (color: Color, alpha: number): Color => ({
    r: color.r, b: color.b, g: color.g, a: alpha
})

// Const Colors

export const Black: Color = {r: 0, g: 0, b: 0, a: 255};
export const Grey: Color = {r: 128, g: 128, b: 128, a: 255};
export const White: Color = {r: 255, g: 255, b: 255, a: 255};

export const Red: Color = {r: 255, g: 0, b: 0, a: 255};
export const Green: Color = {r: 0, g: 255, b: 0, a: 255};
export const Blue: Color = {r: 0, g: 0, b: 255, a: 255};

export const Cyan: Color = {r: 0, g: 255, b: 255, a: 255};
export const Magenta: Color = {r: 255, g: 0, b: 255, a: 255};
export const Yellow: Color = {r: 255, g: 255, b: 0, a: 255};

// Advanced Const Colors

export const getCurrentRainbowColor = (speed: number = 1, offset: number = 0): Color => {
    let dateTime = new Date()
    let millis = dateTime.getTime() * speed + offset * 1000;
    return getRainbowColor(millis);
}

export const getRainbowColor = (time: number): Color => {
    const scaledTime = time * 2 * Math.PI / 1000;
    return {
        r: (Math.sin(scaledTime) + 1) * 0.5 * 255,
        g: (Math.sin(scaledTime + Math.PI * 2 / 3) + 1) * 0.5 * 255,
        b: (Math.sin(scaledTime + Math.PI * 4 / 3) + 1) * 0.5 * 255,
        a: 255
    }
}

export const getCurrentRainbowColorFullRange = (speed: number = 1, offset: number = 0, rangeAmount: number = 0.1): Color => {
    let dateTime = new Date()
    let millis = dateTime.getTime() * speed + offset;
    return getRainbowColorFullRange(millis, rangeAmount);
}

export const getRainbowColorFullRange = (time: number, rangeAmount: number = 0.1): Color => {
    const scaledTime = time * 2 * Math.PI / 1000;
    return {
        r: (Math.sin(scaledTime * (1 - rangeAmount)) + 1) * 0.5 * 255,
        g: (Math.sin(scaledTime + Math.PI * 2 / 3) + 1) * 0.5 * 255,
        b: (Math.sin(scaledTime * (1 + rangeAmount) + Math.PI * 4 / 3) + 1) * 0.5 * 255,
        a: 255
    }
}
