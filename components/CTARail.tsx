export default function CTARail({ garage }:{ garage:any }) {
  return (
    <section className="py-8 md:py-10" style={{ backgroundImage: 'linear-gradient(90deg, var(--ts-accent), var(--ts-accent))' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-white text-xl md:text-2xl font-semibold">Ready to book your MOT?</h3>
        <div className="flex gap-3">
          <a 
            href="#booking" 
            className="rounded-lg bg-white text-slate-900 px-4 py-2 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70"
          >
            Book MOT now
          </a>
          <a 
            href={`tel:${garage?.contact?.phone || ''}`} 
            className="rounded-lg border border-white/70 text-white px-4 py-2 font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70"
          >
            Call {garage?.contact?.shortPhone || garage?.contact?.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
