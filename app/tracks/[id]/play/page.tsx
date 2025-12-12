'use client'

import { useParams } from 'next/navigation';
import AudioAnalyzer from '@/components/AudioAnalyzer';
import TrackPlayer from '@/components/TrackPlayer';
import { ChordProvider } from '@/components/ChordContext';
import { Button } from "flowbite-react";
import Link from 'next/link';

export default function Home() {

  const params = useParams();
  const { id } = params;

  return (
      <>
       <Link key="back" className="m-5" href={`/tracks/${id}`}> <Button className="m-2" as="span" color="teal" pill> ← Go Back</Button></Link> 

        <ChordProvider>
          <TrackPlayer id={id as string} />
          <AudioAnalyzer />
        </ChordProvider>
      </>
  );
}
