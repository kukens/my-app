'use client'

import { Button } from "flowbite-react";
import Challenge from "@/components/Challenge"
import { useRouter } from 'next/navigation';

export default function Home() {

  
  const router = useRouter();

  
  return (
    <main className="">
      <Button className="m-5 mb-10" as="span" color="teal" pill onClick={() => { router.back() }}> ← Go Back</Button>

      <Challenge />
    </main>
  );
}
