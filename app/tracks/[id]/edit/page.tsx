'use client'

import { useParams } from 'next/navigation';
import ChordProgressionCreator from '@/components/ChordProgressionCreator';
import { Button } from "flowbite-react";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TrackData } from '@/types/TrackData';

export default function Track() {

  const params = useParams();
  const { id } = params;
  const [trackData, setTrackData] = useState<TrackData | null>(null)

  useEffect(() => {
    const trackDataFromLocalStorage = JSON.parse(localStorage.getItem(`trackData-${id}`) ?? "") as TrackData;
    setTrackData(trackDataFromLocalStorage)
  }, []);


  return (
    <>
      <Link key="back" className="m-5" href={`/`}> <Button as="span" color="teal" pill> ← Go Back</Button></Link>
      <ChordProgressionCreator TrackData={trackData} Id={id as string} />
    </>
  );
}
