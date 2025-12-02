'use client';

import { useEffect, useState, useRef } from 'react';
import { AudioService } from '@/services/AudioAnalyzerService';
import { HitsData, CurrentAudioData, EvaluatedChord, AnalysisResult } from '@/services/AudioAnalyzerService.types';
import { getTolerance } from '@/lib/AudioAnalyzerUtilities';
import { useChord } from "./ChordContext";
import type { WorkerIn, WorkerOut } from "@/services/AudioAnalyzerWorker";
import { ChordValue } from "./ChordContext";

export default function AudioAnalyzerWorker() {

    const [hitsData, sethitsData] = useState<HitsData | null>(null);
    const [audioData, setAudioData] = useState<CurrentAudioData | null>(null);
    const [evaluatedChords, setEvaluatedChords] = useState<EvaluatedChord[]>([]);
    const { setEvaluatedChord } = useChord();

    const containerRef = useRef<HTMLDivElement | null>(null);


    const workerRef = useRef<Worker | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);

    const [running, setRunning] = useState(false);


    const [isToggled, setIsToggled] = useState(false);
    const [isEnableDiagnostics, setEnableDiagnostics] = useState(false);

    useEffect(() => {

        if (isToggled) {
            start();
            console.log("AudioAnalyzer effect 2");

            workerRef.current = new Worker(
                new URL("../services/AudioAnalyzerWorker.tsx", import.meta.url),
                { type: "module" }
            );

            workerRef.current.onmessage = (e: MessageEvent<WorkerOut>) => {
                console.log('workerRef.current.onmessage')
                if (e.data.type === "spectrum") {
                    const analyzisResult = e.data.analysisResult;
                    if (isEnableDiagnostics) {
                        if (analyzisResult.audioData) setAudioData(analyzisResult.audioData);
                        if (analyzisResult.hitsData) sethitsData(analyzisResult.hitsData);
                        if (analyzisResult.evaluatedChords.length > 0) {
                            setEvaluatedChords(analyzisResult.evaluatedChords);
                        }
                    }
                    if (analyzisResult.evaluatedChords.length > 0) {
                        setEvaluatedChord({
                            value: analyzisResult.evaluatedChords[0].chordName,
                            version: crypto.randomUUID(),
                        });
                    }
                }
            };

            return () => {
                workerRef.current?.terminate();
                audioCtxRef.current?.close();
                stop();
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

    // ✅ Start mic capture
    const start = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);

        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        source.connect(processor);
        processor.connect(audioCtx.destination);

        processor.onaudioprocess = (e) => {
            const samples = e.inputBuffer.getChannelData(0);

            // ✅ ZERO-COPY transfer to worker
            workerRef.current?.postMessage(
                {
                    type: "analyze",
                    samples,
                    sampleRate: audioCtx.sampleRate,
                } as WorkerIn,
                [samples.buffer]
            );
        };

        setRunning(true);
    };

    const stop = () => {
        processorRef.current?.disconnect();
        audioCtxRef.current?.close();
        workerRef.current?.postMessage({ type: "stop" });
        setRunning(false);
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