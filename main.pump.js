const POOLS = {
  Q: { name: "Q-Pool", qualitaet: 0.82, richtung: "vorwaerts", laenge: 47 },
  Vektor: { name: "Vektor-Pool", ABC: "A-3-9-81", orbit_link: "OCTA", tmp81: 0.763 },
  NC: { name: "NC-Pool", nc: "aktiv", hdf_path: "/pool/nc/data" },
};

function runPumpHit() {
  const sprung = { kette: "DROP -> VOID -> RISE -> ROOT", orbit: 27 };
  const fall = { kette: "FALLEN -> LOCH -> AUFSTEHEN -> STAND", wert: 9 };
  const energie = { eingang: sprung.orbit + fall.wert };

  return {
    pools: POOLS,
    kombinat: { sprung, fall, energie },
    home: { wert: 41, zustand: "getroffen" },
    mirror: ")so(",
  };
}
