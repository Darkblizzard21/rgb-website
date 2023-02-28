import {GetColorName} from "../interfaceVersions/AdvancedColors";
import {get1DCoordinate, getColorFromDataArray} from "../interfaceVersions/Color";

export const AddColorNameFinderToCanvas = (canvas: HTMLCanvasElement, data: Uint8ClampedArray, targetInnerHTML: string) => {
    const descriptionTarget = document.getElementById(targetInnerHTML);
    descriptionTarget.innerHTML = "Click on the checker board to see color name.";

    canvas.addEventListener('click', (evt => {
        let rect = canvas.getBoundingClientRect(),
            x = evt.clientX - rect.left,
            y = evt.clientY - rect.top;
        const colorName = GetColorName(
            getColorFromDataArray(data, get1DCoordinate(x, y, canvas.width)));
        descriptionTarget.innerHTML = "You clicked on the color: " + colorName;
    }))
}