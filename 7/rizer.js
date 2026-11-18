exec() {
  if (this.lage !== "RISE") return "NO-RISE";

  return {
    state: "ACTIVE",
    direction: "UP",
    respo: this.respo,
    io: this.io,
    axis: this.axis,
    pipeline: 4,
    flow: { H, B, T, Q, D, F },
    port: {
      ma1: "increase",
      ma2: "boost",
      ma3: "grow"
    }
  };
}
