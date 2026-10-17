export function playNotificationSound() {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // ---- Tone 1 (Lower note, clear)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // ---- Tone 2 (Higher note, softer, 120ms later)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1174.66, now + 0.12); // D6
    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.12, now + 0.13);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.3);

    // Cleanup
    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
    }, 600);
  } catch (err) {
    // Silent fail — audio is not critical
  }
}