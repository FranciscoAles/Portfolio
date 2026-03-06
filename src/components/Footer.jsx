export default function Footer() {
    return (
        <footer className="bg-[#0a0a0f] pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] border-t border-brand-brown/50 relative z-50 mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
                    <div>
                        <h3 className="font-serif font-bold tracking-widest text-2xl uppercase text-brand-light mb-4">
                            Francisco Alesandroni
                        </h3>
                        <p className="font-sans text-brand-light/60 text-sm max-w-xs leading-relaxed">
                            Video Editor & VFX Artist. Crafting digital instruments with cinematic precision.
                        </p>
                    </div>

                    <div className="mt-12 flex items-center gap-3 bg-brand-dark border border-brand-brown/30 rounded-full px-4 py-2 w-max">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_#22c55e]"></div>
                        <span className="font-mono text-xs text-brand-light/80 tracking-widest uppercase">System Operational</span>
                    </div>
                </div>

                {/* Navigation Columns */}
                <div className="col-span-1 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-mono text-xs text-brand-ocean tracking-widest uppercase mb-2">Index</h4>
                        <a href="#work" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Showreel</a>
                        <a href="#capabilities" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Capabilities</a>
                        <a href="#philosophy" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Manifesto</a>
                        <a href="#protocol" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Protocol</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-mono text-xs text-brand-ocean tracking-widest uppercase mb-2">Socials</h4>
                        <a href="#" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">LinkedIn</a>
                        <a href="#" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Vimeo</a>
                        <a href="#" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Instagram</a>
                        <a href="#" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">ArtStation</a>
                    </div>

                    <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
                        <h4 className="font-mono text-xs text-brand-ocean tracking-widest uppercase mb-2">Legal</h4>
                        <a href="#" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Privacy Policy</a>
                        <a href="#" className="font-sans text-sm text-brand-light/60 hover:text-brand-light transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-brand-brown/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-mono text-[10px] text-brand-light/40 tracking-widest uppercase">
                    © {new Date().getFullYear()} Francisco Alesandroni. All rights reserved.
                </p>
                <p className="font-mono text-[10px] text-brand-light/40 tracking-widest uppercase">
                    Handcrafted in React.
                </p>
            </div>
        </footer>
    );
}
