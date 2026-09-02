import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Procedural ambient audio for the WebGL experience — no audio assets needed.
 * A low drone pad plus a filtered noise "air" layer, with a soft chime that
 * can be triggered when the story enters a new chapter.
 * Starts muted: audio only begins after an explicit user gesture.
 */
export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const build = useCallback(() => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Drone: two detuned saw-ish oscillators through a lowpass
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.8;
    filter.connect(master);

    const oscs: OscillatorNode[] = [];
    [55, 82.4, 110, 164.8].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      osc.detune.value = (i - 1.5) * 6;
      const g = ctx.createGain();
      g.gain.value = 0.16 / (i + 1);
      // slow amplitude drift per voice
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
      osc.connect(g).connect(filter);
      osc.start();
      oscs.push(osc, lfo);
    });

    // Air layer: looping noise buffer, heavily filtered
    const len = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 900;
    noiseFilter.Q.value = 0.5;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.035;
    noise.connect(noiseFilter).connect(noiseGain).connect(master);
    noise.start();

    ctxRef.current = ctx;
    masterRef.current = master;
    filterRef.current = filter;
    stopRef.current = () => {
      oscs.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* already stopped */
        }
      });
      try {
        noise.stop();
      } catch {
        /* already stopped */
      }
      void ctx.close();
      ctxRef.current = null;
      masterRef.current = null;
      filterRef.current = null;
    };
    return ctx;
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      const master = masterRef.current;
      const ctx = ctxRef.current;
      if (master && ctx) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        window.setTimeout(() => stopRef.current?.(), 600);
      }
      setEnabled(false);
      return;
    }
    const ctx = ctxRef.current ?? build();
    if (!ctx) return;
    void ctx.resume();
    const master = masterRef.current;
    if (master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.6);
    }
    setEnabled(true);
  }, [build, enabled]);

  /** Open the drone filter as the story escalates (0..1). */
  const setIntensity = useCallback((value: number) => {
    const ctx = ctxRef.current;
    const filter = filterRef.current;
    if (!ctx || !filter) return;
    filter.frequency.setTargetAtTime(360 + value * 1400, ctx.currentTime, 0.6);
  }, []);

  /** Short bell used on chapter changes. */
  const chime = useCallback((semitone = 0) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 587.33 * Math.pow(2, semitone / 12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    osc.connect(g).connect(master);
    osc.start(now);
    osc.stop(now + 2);
  }, []);

  useEffect(() => () => stopRef.current?.(), []);

  return { enabled, toggle, setIntensity, chime };
}
