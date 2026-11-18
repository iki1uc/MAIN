// iki1uc · MAIN · LOWER ROOT · TMPCHAIN

const MAIN = {
    lage: "ROOT",
    respo: "ROOT",

    color: {
        ursache: "gelb",
        wirkung: "rot",
        ergebnis: "grün"
    },

    percent: {
        ursache: 33,
        wirkung: 66,
        ergebnis: 99,
        voll: 100
    },

    rot: {
        r360: 360,
        r8x: 360 * 8,
        r12x: 360 * 12
    },

    QI: ["◉", 3, "◎", "◆", "△", "▣", 81, 756, 27, 3, "↺"],
    IQQ: [3, 9, 81, 756, 27, 3, "↺"],

    set({ lage, respo } = {}) {
        if (lage !== undefined) this.lage = lage;
        if (respo !== undefined) this.respo = respo;

        return { lage: this.lage, respo: this.respo };
    },

    chain(type = "IQQ") {
        return type === "QI" ? this.QI : this.IQQ;
    },

    exec(operator, ebene) {
        if (this.lage !== "ROOT") return "NO-ROOT";

        const key = ebene?.toLowerCase();
        const base = TMP360.full(operator, ebene);

        return {
            ...base,
            state: "ROOT",
            respo: this.respo,
            color: this.color[key],
            percent: this.percent[key],
            rot360: this.rot.r360,
            rot8x: this.rot.r8x,
            rot12x: this.rot.r12x,
            QI: this.chain("QI"),
            IQQ: this.chain("IQQ")
        };
    }
};

// Beispiel
console.log(MAIN.exec("slide", "Ursache"));
console.log(MAIN.exec("score", "Ergebnis"));
