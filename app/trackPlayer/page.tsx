import AudioAnalyzer from '@/components/AudioAnalyzer';
import Bars from '@/components/Bars';
import { ChordProvider } from '@/components/ChordContext';

export default function Home() {
  return (
      <main className="">
        <ChordProvider>
          <Bars />
          <AudioAnalyzer />
        </ChordProvider>
      </main>
  );
}
