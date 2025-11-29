'use client'

import ChordProgressionCreator from '@/components/ChordProgressionCreator';
import { Button } from 'konsta/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Track() {

  const router = useRouter();

  return (
      <main className="">
        <Button small rounded outline component="span" onClick={()=>{router.back()}}> ← Go Back</Button>

        <ChordProgressionCreator />
      </main>
  );
}
