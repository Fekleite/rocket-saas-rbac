import { Header } from '@/components/header';

export default function Home() {
  return (
    <div>
      <Header />

      <main className="mx-auto max-w-[1280px] px-4">
        <p className="text-muted-foreground text-sm">Select an organization</p>
      </main>
    </div>
  );
}
