/* iki1uc – MAIN · Bewegung 8 · DROP */

let H = 1;
let B = 1;
let T = 1;
let Q = 1;
let D = 1;
let F = 1;

window.setDROP = ({ h, b, t, q, d, f } = {}) => {
    if (h !== undefined) H = h;
    if (b !== undefined) B = b;
    if (t !== undefined) T = t;
    if (q !== undefined) Q = q;
    if (d !== undefined) D = d;
    if (f !== undefined) F = f;

    return { H, B, T, Q, D, F };
};

const MAIN = {
    lage: "DROP",
    respo: "NOK",
    move: "descend",
    axis: "AIV",
    io: "allOUT",

    exec() {
        if (this.lage !== "DROP") return "NO-DROP";

        return {
            state: "ACTIVE",
            direction: "DOWN",
            respo: this.respo,
            io: this.io,
            axis: this.axis,
            pipeline: 1,
            flow: { H, B, T, Q, D, F },
            port: {
                ma1: "release",
                ma2: "reduce",
                ma3: "lower"
            }
        };
    }
};

const DROP = MAIN.exec();
console.log(DROP);
