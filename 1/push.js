const MAIN = {
  lage: "PUSH",
  respo: "OK",
  move: "forward",
  axis: "AIR",
  io: "allIN",

  exec() {
    if (this.lage !== "PUSH") return "NO-PUSH";

    return {
      state: "ACTIVE",
      direction: this.move.toUpperCase(),
      respo: this.respo,
      io: this.io,
      axis: this.axis,
      pipeline: 1,
      port: {
        ma1: "impulse",
        ma2: "none",
        ma3: "none"
      }
    };
  }
};

console.log(MAIN.exec());
