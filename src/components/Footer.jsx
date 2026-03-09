import { useState, useEffect } from 'react';

export default function Footer() {
    const [gifLoaded, setGifLoaded] = useState(false);
    const [gifError, setGifError] = useState(false);
    const [pictureLoaded, setPictureLoaded] = useState(false);
    const [pictureError, setPictureError] = useState(false);

    useEffect(() => {
        // Preload GIF
        const gifImg = new Image();
        gifImg.onload = () => setGifLoaded(true);
        gifImg.onerror = () => setGifError(true);
        gifImg.src = '/Optimized Gif.gif';

        // Preload Picture
        const picImg = new Image();
        picImg.onload = () => setPictureLoaded(true);
        picImg.onerror = () => setPictureError(true);
        picImg.src = '/Picture.png';
    }, []);

    const hasAnyImage = (gifLoaded && !gifError) || (pictureLoaded && !pictureError);

    return (
        <footer className="bg-[#0a0a0f] pt-16 pb-8 px-6 md:px-16 rounded-t-[3rem] border-t border-brand-brown/50 relative z-50 mt-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className={`max-w-7xl mx-auto ${hasAnyImage ? 'grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-8' : 'text-center mb-8'}`}>

                {/* Brand Column */}
                <div className={hasAnyImage ? 'col-span-1 md:col-span-5 flex flex-col justify-between' : ''}>
                    <div className={hasAnyImage ? '' : 'text-center'}>
                        <h3 className="font-serif font-bold tracking-widest text-xl uppercase text-brand-light mb-3">
                            Francisco Alesandroni
                        </h3>
                        <p className="font-sans text-brand-light/60 text-sm max-w-xs leading-relaxed mx-auto">
                            Video Editor but also just an overall pretty friendly, down to earth, cool guy. Shoot me an email and we'll figure out whatever you want to make happen.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className={`mt-8 flex items-center gap-6 ${hasAnyImage ? '' : 'justify-center'}`}>
                        <a 
                            href="https://www.linkedin.com/in/francisco-alesandroni-b173a9296" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-brand-dark border border-brand-brown/30 rounded-full flex items-center justify-center hover:bg-brand-ocean hover:border-brand-ocean transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-brand-light group-hover:text-brand-dark transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a 
                            href="mailto:franciscoalesandroni@outlook.com"
                            className="w-10 h-10 bg-brand-dark border border-brand-brown/30 rounded-full flex items-center justify-center hover:bg-brand-amber hover:border-brand-amber transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-brand-light group-hover:text-brand-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Logo/Image section - only show if any image loads */}
                {hasAnyImage && (
                    <div className="col-span-1 md:col-span-7 flex items-center justify-center">
                        <div className="w-full max-w-sm h-40 md:h-auto flex items-center justify-center">
                            {gifLoaded && !gifError ? (
                                <img 
                                    src="/Optimized Gif.gif" 
                                    alt="Francisco Alesandroni Logo" 
                                    className="w-full h-auto rounded-2xl border border-brand-brown/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                                />
                            ) : (
                                <img 
                                    src="/Picture.png" 
                                    alt="Francisco Alesandroni Logo" 
                                    className="w-full h-auto rounded-2xl border border-brand-brown/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className={`max-w-7xl mx-auto border-t border-brand-brown/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 ${hasAnyImage ? '' : 'text-center'}`}>
                <p className="font-mono text-[10px] text-brand-light/40 tracking-widest uppercase">
                    {new Date().getFullYear()} Francisco Alesandroni. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
