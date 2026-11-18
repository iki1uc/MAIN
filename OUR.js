function onFall() {
  play("schrei");
  onSoundEnded("schrei", () => play("lachen"));
}
