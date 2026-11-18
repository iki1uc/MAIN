(() => {
  // Werte hier einfach anpassen
  const FLOW = {
    H: 0,
    B: 0,
    T: 0,
    Q: 0,
    D: 0,
    F: 0
  };

  // Beispiel: setFLOW({ h: 10, b: 20 })
  window.setFLOW = (values = {}) => {
    const keys = { h: "H", b: "B", t: "T", q: "Q", d: "D", f: "F" };

    for (const [input, key] of Object.entries(keys)) {
      if (values[input] !== undefined) FLOW[key] = values[input];
    }

    return { ...FLOW };
  };

  // Werte jederzeit auslesen
  window.getFLOW = () => ({ ...FLOW });
})();
