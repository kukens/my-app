"use client";

import { useEffect, useState } from 'react';
import { TrackData } from '@/types/TrackData';
import Link from 'next/link';
import { Button } from "flowbite-react";

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
      <h2 className="dark:text-white text-center">My tracks:</h2>
     
      {tracks.map((track) => (
        <Link key={track.id} className="m-5" href={`/tracks/${track.id}`}><Button as="span" color="dark" pill>{track.name}</Button></Link>
      ))}
    </div>

  );
}
