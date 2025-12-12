"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TrackData } from '@/types/TrackData';
import Link from 'next/link';
import { Button } from "flowbite-react";
import TrackDetails from '@/components/TrackDetails';

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
            <div>
                <Link key="back" className="m-5" href={`/`}> <Button as="span" color="teal" pill> ← Go Back</Button></Link>


                <h2 className="dark:text-white text-center">{trackData?.name}</h2>
                <p className="dark:text-white text-center">Tempo: {trackData?.tempo} </p>

                <Link className="m-5" href={`/tracks/${trackData?.id}/play`}><Button as="span" color="teal" pill >Play</Button></Link>
                <Link className="m-5" href={`/tracks/${trackData?.id}/edit`}><Button as="span" color="teal" pill >Edit</Button></Link>
            </div>
            <TrackDetails TrackData={trackData} />
        </>
    );
}
