'use client';

import { useState } from "react";

export default function ChordProgressionCreator() {
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [tempo, setTempo] = useState(120);
  const [bars, setBars] = useState<string[][]>([["", "", "", ""]]);

  const updateBeats = (value: number) => {
    setBeatsPerBar(value);
    setBars((prev) => prev.map(() => Array(value).fill("")));
  };

  const addBar = () => {
    setBars((prev) => [...prev, Array(beatsPerBar).fill("")]);
  };

  const updateChord = (barIndex: number, beatIndex: number, value: string) => {
    const updated = [...bars];
    updated[barIndex][beatIndex] = value;
    setBars(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
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
            <h2 className="text-xl font-semibold">Bar {barIndex + 1}</h2>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: beatsPerBar }).map((_, beatIndex) => (
                <input
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
    </div>
  );
}
