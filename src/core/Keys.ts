export namespace Keys {
    export enum Key {
        w= "w", a = "a", s = "s", d = "d",
        q = "q", e = "e", r = "r",
        i = "r", k = "k", j = "j", l = "l",
        ArrowRight = "ArrowRight", ArrowLeft = "ArrowLeft",
        x = "x", y = "y"
    }

    let keyMap = new Map();

    export const GetKeyAxis = (positiveKey: Key, negativeKey: Key): number => {
        if (Keys.GetKeydown(positiveKey)) {
            return 1;
        } else if (Keys.GetKeydown(negativeKey)) {
            return -1;
        }
        return 0;
    }

    export const GetKeydown = (key: Key): boolean => {
        if (keyMap.has(key)) {
            return keyMap.get(key);
        }
        return false;
    }

    export const RegisterToDocument = () => {
        for (let key in Key) {
            keyMap.set(key, false);
        }

        window.addEventListener("keydown", (evt => {
            if (keyMap.has(evt.key)) keyMap.set(evt.key, true);
        }));
        window.addEventListener("keyup", (evt => {
            if (keyMap.has(evt.key)) keyMap.set(evt.key, false);
        }));
    }
}