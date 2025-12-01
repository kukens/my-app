'use client';

import { useEffect, useState, useRef } from 'react';
import { AudioService } from '@/services/AudioAnalyzerService';
import { HitsData, CurrentAudioData, EvaluatedChord } from '@/services/AudioAnalyzerService.types';
import { getTolerance } from '@/lib/AudioAnalyzerUtilities';
import { useChord } from "./ChordContext";

import { ChordValue } from "./ChordContext";

export default function AudioAnalyzer() {

    const [hitsData, sethitsData] = useState<HitsData | null>(null);
    const [audioData, setAudioData] = useState<CurrentAudioData | null>(null);
    const [evaluatedChords, setEvaluatedChords] = useState<EvaluatedChord[]>([]);
    const { setEvaluatedChord } = useChord();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const serref = useRef<AudioService>(null);


    const [isToggled, setIsToggled] = useState(false);
    const [isEnableDiagnostics, setEnableDiagnostics] = useState(false);

    useEffect(() => {

        if (isToggled)
        {
                    console.log("AudioAnalyzer effect");

        const service = new AudioService();

        console.log('isToggled: ' + isToggled)

        service.initMicrophone().then(() => {
            service.startAnalysis((features) => {
                if (isEnableDiagnostics) {
                    if (features.audioData) setAudioData(features.audioData);
                    if (features.hitsData) sethitsData(features.hitsData);
                    if (features.evaluatedChords.length > 0) {
                        setEvaluatedChords(features.evaluatedChords);
                    }
                }
                if (features.evaluatedChords.length > 0) {
                    setEvaluatedChord({
                        value: features.evaluatedChords[0].chordName,
                        version: crypto.randomUUID(),
                    });
                }
            });
        
        });
        
        return () => {
            service.stopAnalysis();
        }
    }
    }, [isToggled]);

    const handleToggle = () => {
        setIsToggled(prevState => !prevState);
        if (containerRef.current?.classList.contains("started")) {
            containerRef.current?.classList.remove("started");
        }
        else {
            containerRef.current?.classList.add("started");
        }
    };

    const enableDiagnostics = () => {
        setEnableDiagnostics(prevState => !prevState);
    };

    return <div ref={containerRef} className="w-full">

        <button className="bg-blue-500 m-2hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggle}>
            {isToggled ? 'STOP' : 'START'}
        </button>

        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={enableDiagnostics}>
            {isEnableDiagnostics ? 'DIAGNOSTICS OFF' : 'DIAGNOSTICS ON'}
        </button>

        <br />  <br />

        {isEnableDiagnostics &&
            <div><p>mean: {audioData?.mean.toFixed(1)}</p>
                <p>rms: {audioData?.rms.toFixed(1)}</p>
                <br />
                <p>meanScore: {hitsData?.meanScore.toFixed(1)}</p>
                <p>rmsFrequencyHits: {hitsData?.rmsFrequencyHits.toFixed(1)}</p>
                <p>rmsFrequencyHits: {hitsData?.meanFrequencyHits.toFixed(1)}</p>
                <p>rmsFrequencyHits: {hitsData?.rmsFrequencyHits.toFixed(1)}</p>
                <br />

                <h3>Chords:</h3>
                <ul>
                    {evaluatedChords.slice(0, 5).map(x => (
                        <li key={x.chordName}>{x.chordName} - {x.score.toFixed(1)}</li>
                    ))}
                </ul>

                <br />
                <h3>Notes:</h3>
                <ul>
                    {hitsData?.familyScores.map(x => (
                        <li key={x[0]}>{x[0]} - {x[1].toFixed(1)}</li>
                    ))}
                </ul>
                <br />


                <h3>Freq vs Amplitude:</h3>
                <ul>
                    {audioData?.peaks.map(x => (
                        <li key={x.freq}>{x.freq.toFixed(1)} ({getTolerance(x.freq).toFixed(1)}) - {x.magnitude.toFixed(1)}</li>
                    ))}
                </ul>
            </div>

        }
    </div>
}