'use client';

import { useEffect, useRef } from 'react';
import { useChord } from './ChordContext';
import styles from './Bars.module.css';

import { TRACK_DATA } from '@/data/track1';
import { TrackData } from '@/data/track1';

export default function Bars() {
 
    const { evaluatedChord } = useChord();

    const trackDataRef = useRef<TrackData>(TRACK_DATA);
    const beatsElementsRef = useRef<HTMLDivElement[]>([]);
    const barsElementsRef = useRef<HTMLDivElement[]>([]);
    const evaluatedChordRef = useRef(evaluatedChord);
    const evaluatedChordVerionsRef = useRef(evaluatedChord?.version);
    
    const indexRef = useRef(0);

    const registerBeats = (el: HTMLDivElement | null) => {
        if (el && !beatsElementsRef.current.includes(el)) {
            beatsElementsRef.current.push(el);
        }
    };

    const registerBars = (el: HTMLDivElement | null) => {
        if (el && !barsElementsRef.current.includes(el)) {
            barsElementsRef.current.push(el);
        }
    };

    function tick(timePerBar: number) {

        const beats = beatsElementsRef.current;
        const bars = barsElementsRef.current;
        const currentIndex = indexRef.current;

        const beatsLength = beatsElementsRef.current.length;
        const barsLength = bars.length;

        const currentBar = Math.ceil((currentIndex + 1) / 4) - 1;
        const previousBar = currentBar == 0 ? barsLength - 1 : currentBar - 1;

        bars[currentBar].classList.add(styles.active);
        bars[currentBar].style.animationDuration = `${timePerBar}ms`;
        bars[previousBar].classList.remove(styles.active);
        bars[previousBar].style.animationDuration = "";

        const previousBeat = currentIndex == 0 ? beatsLength - 1 : currentIndex - 1;
        beats[currentIndex].classList.add(styles.active);
        beats[currentIndex].classList.remove("bg-green-800");
        beats[previousBeat].classList.remove(styles.active);
        

        indexRef.current = (currentIndex + 1) % beatsLength

        console.log(indexRef.current + ' ' + Date.now());
    }

    useEffect(() => {
        console.log('bar efftc');
                console.log(Date.now());
        const timePerBeat = 60 / TRACK_DATA.tempo * 1000;
        const id = setInterval(() => {
            tick(timePerBeat * 4)
        },
            timePerBeat);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        evaluatedChordRef.current = evaluatedChord;

        const beats = beatsElementsRef.current;
        const currentIndex = indexRef.current - 1 < 0? beats.length - 1 : indexRef.current  - 1;

      //  console.log(Date.now() + ' ' + evaluatedChord?.value + ' ' + evaluatedChord?.version)
        console.log('evaluated index: ' +  currentIndex)

        if (evaluatedChordVerionsRef.current == evaluatedChordRef.current?.version) {
             console.log("chord version DID NOT chang");
        }
        else {
            console.log("chord version changed");
              console.log(evaluatedChordRef.current?.value + " " + evaluatedChordRef.current?.version);

            if (beats[currentIndex].dataset.chord == evaluatedChordRef.current?.value) {
                beats[currentIndex].classList.add("bg-green-800")
            }
        }

        evaluatedChordVerionsRef.current = evaluatedChordRef.current?.version;

    }, [evaluatedChord]);

    return (
        <div className="bars relative overflow-hidden h-96">
            <div className="slider-verticalx">
                {TRACK_DATA.bars.map((bar, i) => (
                    <div key={i} className="bar-wrapper flex items-center">
                        <div ref={registerBars} className={`${styles['bar']} grid grid-cols-4 gap-1 w-full p-1`}>
                            {bar.chords.map((chord, j) => (
                                <div key={j} ref={registerBeats} className={`${styles['beat']} rounded-sm bg-gray-500 p-5 text-center`} data-chord={chord}>
                                    {chord}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}