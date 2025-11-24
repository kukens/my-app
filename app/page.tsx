import Link from 'next/link';

export default function Home() {
  return (
      <main className="">
        <h1>Saved Tracks:</h1>
         <Link href="/trackEditor">Track Editor</Link>
      </main>
  );
}
