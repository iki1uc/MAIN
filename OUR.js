function onFall() {
  play("schrei");
  onSoundEnded("schrei", () => play("lachen"));
}
const PLAYER = {
  style: "team",
  cooperative: true
};
