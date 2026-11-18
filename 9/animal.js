/* iki1uc – MAIN · Bewegung 9 · ROOT */

let H = 1;
let B = 1;
let T = 1;
let Q = 1;
let D = 1;
let F = 1;

const MAIN = {
    lage: "ROOT",
    respo: "ROOT",
    move: "origin",
    axis: "AIR",
    io: "allIN",

    set({ h, b, t, q, d, f } = {}) {
        if (h !== undefined) H = h;
        if (b !== undefined) B = b;
        if (t !== undefined) T = t;
        if (q !== undefined) Q = q;
        if (d !== undefined) D = d;
        if (f !== undefined) F = f;

        return { H, B, T, Q, D, F };
    },

    exec() {
        if (this.lage !== "ROOT") return "NO-ROOT";

        return {
            state: "STABLE",
            direction: "ORIGIN",
            respo: this.respo,
            io: this.io,
            axis: this.axis,
            pipeline: 0,
            flow: { H, B, T, Q, D, F },
            port: {
                ma1: "anchor",
                ma2: "origin",
                ma3: "base"
            }
        };
    }
};

const ROOT = MAIN.exec();
console.log(ROOT);

// Beispiel
MAIN.set({ h: 2, b: 1.4, t: 0.8, q: 3, d: 10, f: 1 });
console.log(MAIN.exec());
