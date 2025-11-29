"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TrackData } from '@/data/track1';
import Link from 'next/link';
import { Button } from 'konsta/react';
import { useRouter } from 'next/navigation';

export default function Track() {

      const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [trackData, setTrackData] = useState<TrackData | null>(null)
    useEffect(() => {
        const trackDataFromLocalStorage = JSON.parse(localStorage.getItem(`trackData-${id}`) ?? "") as TrackData;
        setTrackData(trackDataFromLocalStorage)
    }, []);

    return (
        <div>
            <Button small rounded outline component="span" onClick={()=>{router.back()}}> ← Go Back</Button>
            <h1>Track {trackData?.name} </h1>
            <Link className="m-5" href={`/track/${trackData?.id}/play`}><Button small rounded outline component="span">Play</Button></Link>
        </div>
    );
}
