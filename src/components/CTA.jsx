export default function CTA() {
    return (
        <section id="contact" className="py-32 px-6 md:px-16 relative z-20 mt-[-100vh]">
            <div className="max-w-5xl mx-auto bg-brand-brown/10 border border-brand-brown/30 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">

                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-amber/10 blur-[100px] rounded-full pointer-events-none"></div>

                <h2 className="relative z-10 font-sans font-bold text-sm md:text-base uppercase tracking-widest text-brand-ocean mb-6">
                    Initiate Protocol
                </h2>

                <p className="relative z-10 drama-serif text-5xl md:text-7xl lg:text-[5.5rem] text-brand-light leading-none mb-12">
                    Ready to craft your <br />
                    <span className="italic text-brand-amber mt-2 block">masterpiece?</span>
                </p>

                <a href="mailto:francisco@example.com" className="group relative inline-flex overflow-hidden rounded-[3rem] font-sans text-lg font-bold tracking-wider px-14 py-6 transition-transform duration-300 hover:scale-[1.03] active:scale-95 bg-brand-amber text-brand-dark items-center justify-center shadow-[0_10px_40px_rgba(232,136,33,0.3)]">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-light">COMMENCE EDITING</span>
                    <span className="absolute inset-0 bg-brand-ocean translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block"></span>
                </a>
            </div>
        </section>
    );
}
