import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import {
    asCssRgbString, Black, Color, colorToHex, getRainbowColor,
    getRainbowColorFullRange, invertColor
} from "./core/interfaceVersions/Color";
import {AirTransparent, GetColorName} from "./core/interfaceVersions/AdvancedColors";
import {copyTextToClipboard} from "./core/misc/WebHelper";

// General Settings
const TickLatency: number = 10;
const MaxSpeed: number = 1;
const MinSpeed: number = 0.01;
// Boolean Settings
let IsFullRange: boolean = true;
let InvertTextColor: boolean = false;

let colorName = "AirTransparent";
let color: Color = AirTransparent;
let internalTime = 0;
let speed: number = 0.1;

export function drawRGB(tickLatency: number) {
    // Get and update Canvas size
    const canvas = document.getElementById("rgbCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    //Update Color
    internalTime += tickLatency * speed;
    color = IsFullRange ? getRainbowColorFullRange(internalTime) : getRainbowColor(internalTime);
    ctx.fillStyle = asCssRgbString(color);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Update Text Description
    const descriptionTarget = document.getElementById("Pizza_RGB_Description");
    colorName = GetColorName(color);
    descriptionTarget.innerHTML = colorName;
    if (InvertTextColor)
        descriptionTarget.style.color = asCssRgbString(invertColor(color));
}

window.addEventListener('load', evt => {
    drawRGB(0);
    setInterval(() => {
        drawRGB(TickLatency);
    }, TickLatency)
});

window.addEventListener('click', evt => {
    copyTextToClipboard(colorName + ' ' + colorToHex(color));
})

window.addEventListener('wheel', evt => {
    const delta = -Math.sign(evt.deltaY);
    speed += speed * 0.1 * delta;
    if (speed < MinSpeed)
        speed = MinSpeed;
    if (speed > MaxSpeed)
        speed = MaxSpeed;
})

window.addEventListener('keydown', evt => {
    if(evt.key == '1')
        IsFullRange = !IsFullRange;
    if(evt.key == '2')
        InvertTextColor = !InvertTextColor;
    if(!InvertTextColor){
        const descriptionTarget = document.getElementById("Pizza_RGB_Description");
        descriptionTarget.style.color = asCssRgbString(Black);
    }
})
