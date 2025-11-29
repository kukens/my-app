'use client'

import Link from 'next/link';
import { Button } from "konsta/react";
import TrackList  from "@/components/TrackList"

export default function Home() {
  return (
      <main className="">
          <Link className="m-5" href="/track/create"><Button small rounded outline component="span">Add new track</Button></Link>
          <TrackList />
      </main>
  );
}
