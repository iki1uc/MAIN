<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ordner 4 — FLOW · Justierkonsole</title>
  <style>
    body {
      background: #0a0a12;
      color: #ffd700;
      font: 14px Consolas, monospace;
      padding: 16px;
    }
    label { display: block; margin: 10px 0; }
    input, button {
      background: #171722;
      border: 1px solid #665500;
      color: #ffd700;
      font: inherit;
      padding: 7px;
    }
    input { margin-left: 8px; }
    pre {
      color: #d0d9e6;
      background: #11111a;
      padding: 12px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <h1>Ordner 4 — FLOW</h1>

  <label>Lage <input id="lage" value="FLOW"></label>
  <label>Respo <input id="respo" value="FLOW"></label>
  <label>Move <input id="move" value="stream"></label>
  <label>Axis <input id="axis" value="AIR"></label>
  <label>I/O <input id="io" value="allIN"></label>

  <button id="run">FLOW justieren / starten</button>
  <pre id="log">Werte ändern und starten.</pre>

  <script>
    const runButton = document.getElementById("run");

    runButton.addEventListener("click", () => {
      const MAIN = {
        lage: document.getElementById("lage").value.trim(),
        respo: document.getElementById("respo").value.trim(),
        move: document.getElementById("move").value.trim(),
        axis: document.getElementById("axis").value.trim(),
        io: document.getElementById("io").value.trim(),

        exec() {
          if (this.lage !== "FLOW") return "NO-FLOW";

          return {
            state: "ACTIVE",
            direction: "STREAM",
            respo: this.respo,
            move: this.move,
            io: this.io,
            axis: this.axis,
            pipeline: 3,
            port: {
              ma1: "flow",
              ma2: "stable",
              ma3: "continuous"
            }
          };
        }
      };

      const result = MAIN.exec();
      document.getElementById("log").textContent =
        JSON.stringify(result, null, 2);
      console.log(result);
    });
  </script>
</body>
</html>
