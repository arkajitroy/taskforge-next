import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex gap-2 justify-center flex-wrap">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Desctructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="muted">MUTED</Button>
      <Button variant="teritory">Teritory</Button>
      <Button disabled>Disabled</Button>
    </main>
  );
}
