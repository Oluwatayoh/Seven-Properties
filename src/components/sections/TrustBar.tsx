
'use client';

export default function TrustBar() {
  const developers = ["Cappa & D’Alberto", "Elalan", "Craneburg", "ITB"];

  return (
    <div className="bg-muted py-10 border-y border-accent/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <p className="font-headline text-sm uppercase tracking-widest text-primary/60">
            Built by Nigeria’s most trusted names
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {developers.map((dev) => (
              <span key={dev} className="font-headline text-lg md:text-2xl text-primary font-bold opacity-80">
                {dev}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
