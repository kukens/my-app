'use client'

import { useParams } from 'next/navigation';
import AudioAnalyzer from '@/components/AudioAnalyzer';
import AudioAnalyzerWorker from '@/components/AudioAnalyzerWorker';
import Bars from '@/components/Bars';
import { ChordProvider } from '@/components/ChordContext';
import { Button } from 'konsta/react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  return (
      <main className="">
        <Button small rounded outline component="span" onClick={()=>{router.back()}}> ← Go Back</Button>

        <ChordProvider>
          <Bars id={id as string} />
          <AudioAnalyzerWorker />
        </ChordProvider>
      </main>
  );
}
