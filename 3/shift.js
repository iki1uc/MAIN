/* SHIFT nimmt ROOT als Basis
   Universelle Grundbewegung + neues Gold = 1in
*/

const MAIN_ROOT = {
  lage: "ROOT",
  respo: "ROOT",
  move: "origin",
  axis: "AIR",
  io: "allIN",

  exec() {
    if (this.lage !== "ROOT") return "NO-ROOT";

    return {
      state: "STABLE",
      direction: "ORIGIN",
      respo: this.respo,
      io: this.io,
      axis: this.axis,
      pipeline: 0,
      port: {
        ma1: "anchor",
        ma2: "origin",
        ma3: "base"
      }
    };
  }
};

const ROOT_BASE = MAIN_ROOT.exec();

const SHIFT = {
  typ: "1in",
  name: "SHIFT.html",
  bedeutung: "neues Gold = N2+Gold = was ich noch nicht habe",
  basis: ROOT_BASE,

  optionen: {
    "KIpi.raw": {
      art: "KI Pi Material",
      qi: 0.81,
      raum: "81.room = BEST?TMP"
    },
    "ID.html": {
      art: "IDENTITY",
      qi: 0.39,
      raum: "39 = )1( = Fixpunkt"
    },
    "MAIN.raw": {
      art: "Hauptmaterial",
      qi: 0.30,
      raum: "30 => 1 = 9 9 9"
    },
    "Judy-Freibetrag": {
      art: "Monatlichkeit Brücke 31.12",
      qi: 0.12,
      raum: "MARKT ↔ BÖRSE"
    },
    "N2+Gold": {
      art: "Maschine atmet",
      qi: 0.81,
      raum: "ZUG.atem = Maschine"
    }
  },

  gold: null,

  geben(goldName) {
    const opt = this.optionen[goldName] || {
      art: goldName,
      qi: 0.81,
      raum: "neu"
    };

    this.gold = {
      name: goldName,
      ...opt,
      basis: this.basis,
      zeit: new Date().toISOString()
    };

    const log = document.getElementById("goldLog");

    if (log) {
      log.textContent =
        `Basis ROOT: ${JSON.stringify(this.basis, null, 2)}\n\n` +
        `1in = ${goldName}\n` +
        `Art: ${opt.art}\n` +
        `QI: ${opt.qi}\n` +
        `Raum: ${opt.raum}\n\n` +
        `PUSH.html ruft SHIFT.html (1in Gold) + lädt altes liveBOOT als Cache.\n` +
        `root root root ja ja ja eingang → arbeit → prüfen → arbeit → eingang → arbeit → ausgang\n`;
    }

    try {
      localStorage.setItem("SHIFT_1in_GOLD", JSON.stringify(this.gold));

      if (log) {
        log.textContent +=
          "\n[FAST RAM BIO] Gold gespeichert — bleibt auch wenn Fenster zu\n";
      }
    } catch (error) {
      if (log) {
        log.textContent += "\nGold konnte nicht gespeichert werden.\n";
      }
    }

    console.log("SHIFT 1in Gold:", this.gold);
    return this.gold;
  },

  status() {
    const log = document.getElementById("log");
    if (!log) return;

    log.textContent =
      `ROOT Basis: ${JSON.stringify(ROOT_BASE, null, 2)}\n\n` +
      `SHIFT wartet auf 1in Gold — N2+Gold = neues Material\n` +
      `Optionen: KIpi.raw / ID.html / MAIN.raw / Judy-Freibetrag / N2+Gold\n`;
  }
};

window.SHIFT = SHIFT;

SHIFT.status();

const btnGold = document.getElementById("btnGold");

if (btnGold) {
  btnGold.addEventListener("click", () => {
    const input = document.getElementById("goldInput");
    const val = input?.value.trim() || "N2+Gold";
    SHIFT.geben(val);
  });
}
