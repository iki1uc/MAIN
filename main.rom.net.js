const MAIN = {
  lage: "PUSH",
  respo: "OK",
  move: "forward",
  axis: "AIR",
  io: "allIN",

  exec() {
    if (this.lage !== "PUSH") {
      return { state: "INACTIVE", reason: "NO-PUSH" };
    }

    const direction = this.move.toUpperCase();

    return {
      state: "ACTIVE",
      direction,
      respo: this.respo,
      io: this.io,
      axis: this.axis,
      pipeline: 3,
      port: {
        ma1: "impulse",
        ma2: "impulse",
        ma3: "impulse"
      }
    };
  }
};

console.log(MAIN.exec());
