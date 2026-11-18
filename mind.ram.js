<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>mind.ram — Spielwiese</title>
<style>
  :root {
    --bg: #101311;
    --panel: #191e1a;
    --line: #343d35;
    --text: #edf3e9;
    --muted: #a5b0a2;
    --green: #9be564;
    --gold: #ffd166;
    --range: 45%;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 24px;
    color: var(--text);
    background:
      radial-gradient(ellipse at top left, #263328 0, transparent 48%),
      var(--bg);
    font: 16px/1.5 system-ui, sans-serif;
  }

  main { max-width: 1050px; margin: auto; }

  header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 16px;
    margin-bottom: 20px;
  }

  h1 { margin: 0; font-size: clamp(1.8rem, 5vw, 3rem); }
  h1 span { color: var(--green); }
  p { color: var(--muted); margin: 6px 0 0; }

  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr);
    gap: 16px;
  }

  .panel {
    padding: 20px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: rgb(25 30 26 / 92%);
  }

  h2 { margin: 0 0 14px; font-size: 1.05rem; }
  .nodes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }

  button, select {
    color: var(--text);
    background: #222a23;
    border: 1px solid var(--line);
    border-radius: 12px;
    font: inherit;
  }

  button { cursor: pointer; }
  button:hover { border-color: var(--green); }
  button:focus-visible, select:focus-visible, input:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }

  .node {
    min-height: 76px;
    padding: 12px;
    text-align: left;
  }

  .node strong { display: block; }
  .node small { color: var(--muted); }
  .node.active { border-color: var(--green); background: #263624; }

  .control { margin: 18px 0; }
  .control label {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 7px;
  }

  output { color: var(--gold); font-variant-numeric: tabular-nums; }
  input[type="range"] { width: 100%; accent-color: var(--green); }

  .switches { display: flex; flex-wrap: wrap; gap: 8px; }
  .switches button { padding: 9px 13px; }
  .switches button[aria-pressed="true"] {
    border-color: var(--green);
    color: var(--green);
  }

  .status {
    padding: 14px;
    border-radius: 12px;
    background: #111612;
    color: var(--green);
    overflow-wrap: anywhere;
  }

  pre {
    margin: 12px 0 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    color: #cbd6c6;
    font: 13px/1.5 ui-monospace, monospace;
  }

  .actions { display: flex; gap: 8px; margin-top: 14px; }
  .actions button { padding: 9px 13px; }
  .note { font-size: .85rem; }

  @media (max-width: 720px) {
    body { padding: 14px; }
    .layout { grid-template-columns: 1fr; }
    header { display: block; }
    .nodes { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<main>
  <header>
    <div>
      <h1><span>mind.ram</span> — Spielwiese</h1>
      <p>Schieben, schalten, Knoten anklicken. Nichts ist in Stein gemeißelt.</p>
    </div>
  </header>

  <div class="layout">
    <section class="panel">
      <h2>Die sechs Knoten</h2>
      <div class="nodes" id="nodes"></div>

      <h2 style="margin-top:22px">Netz-Modus</h2>
      <div class="switches">
        <button type="button" data-net="NET" aria-pressed="true">)NET( — alle verbunden</button>
        <button type="button" data-net="link" aria-pressed="false">)link( — über die Mitte</button>
      </div>

      <div class="control">
        <label for="height">Höhe <span id="heightValue">50</span></label>
        <input id="height" type="range" min="0" max="100" value="50">
      </div>

      <div class="control">
        <label for="width">Breite <span id="widthValue">50</span></label>
        <input id="width" type="range" min="0" max="100" value="50">
      </div>

      <div class="control">
        <label for="depth">Tiefe <span id="depthValue">50</span></label>
        <input id="depth" type="range" min="0" max="100" value="50">
      </div>

      <label class="switches">
        <input id="mindOn" type="checkbox" checked>
        Tiefe leuchten lassen
      </label>

      <div class="actions">
        <button type="button" id="reset">Zurück auf Start</button>
        <button type="button" id="copy">Zustand kopieren</button>
      </div>
    </section>

    <aside class="panel">
      <h2>Was gerade los ist</h2>
      <div class="status" id="summary" aria-live="polite"></div>
      <pre id="state"></pre>
      <p class="note">Das ist eine interaktive Darstellung deines Modells – kein Messgerät und keine echte BIOS-Steuerung.</p>
    </aside>
  </div>
</main>

<script>
const nodeData = [
  ["mind_1", "Rah — du", "Immer an"],
  ["mind_2", "Raah — Geist", "Optional"],
  ["mind_3", "Höhe", "PUSH · PULL · RISE · DROP"],
  ["mind_4", "Breite", "SHIFT · SPIN · FLOW · BREAK"],
  ["mind_5", "Tiefe", "Flach ↔ leuchtet"],
  ["mind_6", "Brücke", "Übergabe · GEO BRÜCKE"]
];

const state = {
  active: [true, false, true, true, true, true],
  net: "NET",
  height: 50,
  width: 50,
  depth: 50,
  mindOn: true
};

const nodesEl = document.querySelector("#nodes");

nodeData.forEach(([id, name, detail], index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "node";
  button.dataset.index = index;
  button.innerHTML = `<strong>${name}</strong><small>${detail}</small>`;
  button.setAttribute("aria-pressed", "false");
  nodesEl.append(button);
});

function render() {
  document.querySelectorAll(".node").forEach((button, i) => {
    button.classList.toggle("active", state.active[i]);
    button.setAttribute("aria-pressed", String(state.active[i]));
  });

  document.querySelectorAll("[data-net]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.net === state.net));
  });

  for (const key of ["height", "width", "depth"]) {
    document.querySelector(`#${key}`).value = state[key];
    document.querySelector(`#${key}Value`).textContent = state[key];
  }

  document.querySelector("#mindOn").checked = state.mindOn;

  const activeCount = state.active.filter(Boolean).length;
  document.querySelector("#summary").textContent =
    `${activeCount}/6 Knoten aktiv · ${state.net === "NET" ? "alle miteinander verbunden" : "Verbindung über die Mitte"} · Tiefe ${state.mindOn ? "an" : "aus"}`;

  document.querySelector("#state").textContent = JSON.stringify({
    knoten: Object.fromEntries(nodeData.map(([id], i) => [id, state.active[i]])),
    netz: state.net,
    dimensionen: {
      hoehe: Number(state.height),
      breite: Number(state.width),
      tiefe: Number(state.depth)
    },
    tiefeLeuchtet: state.mindOn
  }, null, 2);
}

nodesEl.addEventListener("click", event => {
  const button = event.target.closest(".node");
  if (!button) return;
  const i = Number(button.dataset.index);
  if (i === 0) return; // Der erste Knoten bleibt als "du" an.
  state.active[i] = !state.active[i];
  render();
});

document.querySelectorAll("[data-net]").forEach(button => {
  button.addEventListener("click", () => {
    state.net = button.dataset.net;
    render();
  });
});

for (const key of ["height", "width", "depth"]) {
  document.querySelector(`#${key}`).addEventListener("input", event => {
    state[key] = Number(event.target.value);
    render();
  });
}

document.querySelector("#mindOn").addEventListener("change", event => {
  state.mindOn = event.target.checked;
  render();
});

document.querySelector("#reset").addEventListener("click", () => {
  Object.assign(state, {
    active: [true, false, true, true, true, true],
    net: "NET", height: 50, width: 50, depth: 50, mindOn: true
  });
  render();
});

document.querySelector("#copy").addEventListener("click", async () => {
  const text = document.querySelector("#state").textContent;
  try {
    await navigator.clipboard.writeText(text);
    document.querySelector("#summary").textContent = "Zustand kopiert ✓";
  } catch {
    document.querySelector("#summary").textContent = "Kopieren nicht möglich — Zustand oben markieren.";
  }
});

render();
</script>
</body>
</html>
