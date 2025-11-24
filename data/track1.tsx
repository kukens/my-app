export interface TrackData {
  tempo: number;
  loop: boolean;
  bars: Bar[];
}

interface Bar {
  chords: string[];
}

export const TRACK_DATA: TrackData = { 
  tempo: 80,
  loop: true,  
  bars: [
    { chords: ["C", "Cm", "C", "Cm"] },
    { chords: ["C", "G", "F", "C"] },
    { chords: ["C", "Cm", "C", "Cm"] },
  ]}