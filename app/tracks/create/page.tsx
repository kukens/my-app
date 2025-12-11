'use client'

import ChordProgressionCreator from '@/components/ChordProgressionCreator';
import { Button } from "flowbite-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Track() {

  const router = useRouter();

  return (
      <>
           <Link key="back" className="m-5" href={`/`}> <Button as="span" color="teal" pill> ← Go Back</Button></Link> 


        <ChordProgressionCreator />
      </>
  );
}
