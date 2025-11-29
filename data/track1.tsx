export interface TrackData {
  id: string;
  name: string;
  tempo: number;
  loop: boolean;
  bars: Bar[];
}

export interface Bar {
  chords: string[];
}

export const TRACK_DATA: TrackData = { 
  id: crypto.randomUUID(),
  name: "Crazy chords",
  tempo: 80,
  loop: true,  
  bars: [
    { chords: ["C", "Cm", "C", "Cm"] },
    { chords: ["C", "G", "F", "C"] },
    { chords: ["C", "Cm", "C", "Cm"] },
  ]}