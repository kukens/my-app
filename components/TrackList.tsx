"use client";

import { useEffect, useState } from 'react';
import { TrackData } from '@/data/track1';
import { Button } from 'konsta/react';
import Link from 'next/link';


export default function ClientRoot() {


  const [tracks, setTracks] = useState<TrackData[]>([])

  useEffect(() => {

    const tempTracks: TrackData[] = [];

    for (const key in localStorage) {
      if (key?.startsWith("trackData")) {
        const value = localStorage.getItem(key) ?? "";
        const track = JSON.parse(value) as TrackData;
        tempTracks.push(track);
      }
    }

    setTracks(tempTracks);

  }, []);

  return (
    <div>
      {tracks.map((track) => (
        <Link key={track.id} className="m-5" href={`/track/${track.id}`}><Button small rounded outline component="span">{track.name}</Button></Link>
      ))}
    </div>

  );
}
