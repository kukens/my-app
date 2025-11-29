'use client';

import { useRef, useState } from "react";
import { TrackData, Bar } from "@/data/track1";

export default function ChordProgressionCreator() {
  const [trackName, setTrackName] = useState("");
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [tempo, setTempo] = useState(120);

  const [bars, setBars] = useState<string[][]>([["", "", "", ""]]);
  const beatsElementsRef = useRef<HTMLInputElement[]>([]);

  const id = useRef(crypto.randomUUID());

  const updateBeats = (value: number) => {
    setBeatsPerBar(value);
    setBars((prev) => prev.map(() => Array(value).fill("")));
  };

  const addBar = () => {
    setBars((prev) => [...prev, Array(beatsPerBar).fill("")]);
  };

  const saveTrack = () => {
    let bars: Bar[] = [];

    beatsElementsRef.current.forEach((element, index) => {
      const barIndex = Math.floor(index / beatsPerBar);

      if (index % beatsPerBar == 0) {
        const bar: Bar = {
          chords: []
        };
        bars.push(bar)
      }
      bars[barIndex].chords.push(element.value);
    });

    const trackData: TrackData = {
      id: id.current,
      name: trackName,
      tempo: tempo,
      bars: bars,
      loop: false
    }

    localStorage.setItem(`trackData-${trackData.id}`, JSON.stringify(trackData))
  };

  const updateChord = (barIndex: number, beatIndex: number, value: string) => {
    const updated = [...bars];
    updated[barIndex][beatIndex] = value;
    setBars(updated);
  };

  const registerBeats = (el: HTMLInputElement | null) => {
    if (el && !beatsElementsRef.current.includes(el)) {
      beatsElementsRef.current.push(el);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 font-medium">Track name</label>
          <input
            type="text"
            min={1}
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Beats per Bar</label>
          <input
            type="number"
            min={1}
            value={beatsPerBar}
            onChange={(e) => updateBeats(Number(e.target.value))}
            className="w-full p-2 rounded border"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tempo (BPM)</label>
          <input
            type="number"
            min={20}
            max={300}
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-full p-2 rounded border"
          />
        </div>
      </div>

      <button
        onClick={addBar}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Add Bar
      </button>

      <div className="space-y-6">
        {bars.map((bar, barIndex) => (
          <div key={barIndex} className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: beatsPerBar }).map((_, beatIndex) => (
                <input
                  ref={registerBeats}
                  key={beatIndex}
                  type="text"
                  placeholder={`Beat ${beatIndex + 1}`}
                  value={bars[barIndex][beatIndex] || ""}
                  onChange={(e) => updateChord(barIndex, beatIndex, e.target.value)}
                  className="p-2 rounded border text-center"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={saveTrack}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Save track
      </button>
    </div>
  );
}
