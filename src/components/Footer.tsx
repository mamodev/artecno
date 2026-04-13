"use client";

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background py-48 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        <div className="flex flex-col gap-4">
          <h2 className="text-accent text-xl font-bold uppercase tracking-widest">Get in touch</h2>
          <h3 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            Ready to <br />
            Build?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent opacity-50 italic underline decoration-2">Location</span>
            <p className="text-2xl font-black uppercase leading-tight">
              Via Giacomo Matteotti, 88<br />
              50019 Sesto Fiorentino (FI)<br />
              Italy
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-widest text-accent opacity-50 italic underline decoration-2">Contact</span>
            <p className="text-2xl font-black uppercase whitespace-nowrap leading-tight">
              T +39 055 4494050<br />
              T +39 055 4491837<br />
              <span className="text-lg md:text-2xl">E info@artecnoprogetti.it</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-widest text-accent opacity-50 italic underline decoration-2">Tax Info</span>
            <p className="text-lg font-bold uppercase opacity-70">
              C.F. 93191890487<br />
              P.I. 04935900482
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-10 flex justify-between items-end">
          <span className="text-8xl md:text-[15rem] font-black uppercase leading-none opacity-10 select-none">ARTECNO</span>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-sm font-bold uppercase tracking-widest">© 2026 Artecno Studio Tecnico Associato</span>
            <span className="text-xs font-bold uppercase opacity-50 italic underline decoration-2 decoration-accent cursor-pointer hover:text-accent transition-colors">Alternative Concept</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
