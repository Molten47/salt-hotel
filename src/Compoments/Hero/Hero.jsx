import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import BrandLogo from '../../assets/Brandlogo.png';
import SlideImage1 from '../../assets/Abner (1).png';
import SlideImage2 from '../../assets/Hotel Greystone.webp';
import SlideImage3 from '../../assets/Salt House Inn.webp';
import SlideImage4 from '../../assets/The Brant.png';
import SlideImage5 from '../../assets/The West.webp';
import { ArrowLeft, ArrowRight, Circle, Copyright } from 'lucide-react';

const Hero = () => {
    const sideBar = [
        { id: 1, title: 'Hotels', content: <div><h2>Hotels Content</h2><p>Details about hotels...</p><img src={SlideImage2} alt="Hotel Greystone" /></div> },
        { id: 2, title: 'Restaurants', content: <div><h2>Restaurants Content</h2><p>Information about restaurants...</p><img src={SlideImage3} alt="Salt House Inn" /></div> },
        { id: 3, title: 'About Us', content: <div><h2>About Us Content</h2><p>Our story and mission...</p><img src={SlideImage1} alt="The Abner" /></div> },
        { id: 4, title: 'Community', content: <div><h2>Community Content</h2><p>Engage with our community...</p><img src={SlideImage4} alt="The Brant" /></div> },
        { id: 5, title: 'More', content: <div><h2>More Content</h2><p>Additional information...</p><img src={SlideImage5} alt="The West" /></div> }
    ];

    const firstReelImages = [
        { id: 1, name: 'the west', image: SlideImage5, location: 'Minneapolis, Minnesota' },
        { id: 2, name: 'the brant', image: SlideImage4, location: 'Nantuteck, MA' },
        { id: 3, name: 'the abner', image: SlideImage1, location: 'Litchfield, CT' },
        { id: 4, name: 'the west', image: SlideImage5, location: 'Minneapolis, Minnesota' }
    ];

    const secondReelImages = [
        { id: 1, name: 'salt house inn', image: SlideImage3, location: 'Princetown, MA' },
        { id: 2, name: 'hotel greystone', image: SlideImage2, location: 'Miami Beach, FL' },
        { id: 3, name: 'the west', image: SlideImage5, location: 'Minneapolis, Minnesota' },
        { id: 4, name: 'salt house inn', image: SlideImage3, location: 'Princetown, MA' }
    ];

    const firstReelControls = useAnimationControls();
    const secondReelControls = useAnimationControls();
    const containerRef = useRef(null);
    const [reelHeight, setReelHeight] = useState(0);
    const [openPanelId, setOpenPanelId] = useState(null);

    useEffect(() => {
        if (containerRef.current) {
            setReelHeight(containerRef.current.clientHeight);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setReelHeight(containerRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (reelHeight <= 0) return;

        const slideHeight = reelHeight / 3;
        const totalHeight = slideHeight * 3;

        firstReelControls.start({
            y: [0, -totalHeight],
            transition: {
                y: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "loop" }
            }
        });

        secondReelControls.start({
            y: [-totalHeight, 0],
            transition: {
                y: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "loop" }
            }
        });

    }, [reelHeight, firstReelControls, secondReelControls]);

    const renderReelImage = (slide) => (
        <div key={slide.id} className="w-full h-1/3 overflow-hidden flex flex-col bg-primary">
            <div className="flex w-full h-3/4">
                <img
                    src={slide.image}
                    alt={slide.name}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col px-2 py-2 text-writing">
                <h2 className="uppercase font-bold new-font">{slide.name}</h2>
                <p className="new-font">{slide.location}</p>
            </div>
        </div>
    );

    const handleSidebarItemClick = (id) => {
        setOpenPanelId(id);
    };

    const closePanel = () => {
        setOpenPanelId(null);
    };

    return (
        <div className="w-full min-h-screen bg-primary flex flex-row">
            {/* Left side film reels */}
            <div className="w-[25%] min-h-screen flex flex-row overflow-hidden relative" ref={containerRef}>
                {/* First film reel (moving up) */}
                <div className="w-1/2 h-full overflow-hidden relative">
                    <motion.div
                        className="absolute w-full"
                        style={{ height: 'calc(100% * 4/3)' }}
                        animate={firstReelControls}
                    >
                        {firstReelImages.map(renderReelImage)}
                    </motion.div>
                    {/* Film strip details */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="border-l-2 border-r-2 border-[#111111] h-full opacity-70"></div>
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
                            <div className="flex justify-between w-full">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="h-2 w-2 bg-black rounded-full"></div>
                                ))}
                            </div>
                            <div className="flex justify-between w-full">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="h-2 w-2 bg-black rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second film reel (moving down) */}
                <div className="w-1/2 h-full overflow-hidden relative">
                    <motion.div
                        className="absolute w-full"
                        style={{ height: 'calc(100% * 4/3)' }}
                        animate={secondReelControls}
                    >
                        {secondReelImages.map(renderReelImage)}
                    </motion.div>
                    {/* Film strip details */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="border-r-4 border-black h-full opacity-70"></div>
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
                            <div className="flex justify-between w-full">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="h-2 w-2 bg-black rounded-full"></div>
                                ))}
                            </div>
                            <div className="flex justify-between w-full">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="h-2 w-2 bg-black rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side content */}
            <div className="w-[75%] flex flex-row min-h-screen relative overflow-hidden">
                <div className="flex flex-col w-full border-l border-lines relative"> {/* Make this relative */}
                    <nav className="w-full">
                        <div className="flex justify-left items-center pt-3 m-2">
                            <img src={BrandLogo} alt="SALT HOTELS" />
                        </div>
                    </nav>
                    <div className="w-full h-[0.12rem] bg-lines"></div>
                    <div className="h-[87vh] flex flex-row w-full">
                        <section className="w-[80%] flex flex-col px-10 py-14 justify-center">
                            <div className="p-5 w-3/4">
                                <h1 className="basic-font text-8xl md:text-8xl lg:text-[10rem] leading-32 tracking-normal">
                                    With us <br /> it's personal
                                </h1>
                            </div>
                            <div className="w-1/4 md:w-1/2 lg:w-[20%] p-5 mt-8">
                                <p className="new-font text-sm text-writing">
                                    Lifelong hoteliers. Leading with kindness creating a home for our guests in Provincetown, Nantucket, Connecticut, Miami & beyond.
                                </p>
                            </div>
                            <div className="flex flex-row justify-between items-center p-5 mt-50">
                                <h2 className="text-[1rem] basic-font">EXPLORE</h2>
                                <div className="flex justify-center items-center h-12 w-12 text-writing hover:bg-[#111111] border border-black rounded-full">
                                    <ArrowRight size={30} className="text-writing hover:text-[#f4f0ec]" />
                                </div>
                            </div>
                        </section>

                        {/* Right sidebar navigation grid (Original Design) */}
                        <section className="w-[20%] h-full border-l border-[#111111] z-10"> {/* Add z-index to keep it above the sliding panel */}
                            <div className="grid grid-cols-5 h-full">
                                {sideBar.map((item) => (
                                    <div key={item.id} className="border-b border-[#111111] flex flex-col justify-center items-center py-6 relative cursor-pointer" onClick={() => handleSidebarItemClick(item.id)}>
                                        <div className="flex flex-col items-center absolute justify-center h-full w-full border-r">
                                            <div className="transform text-writing basic-font -rotate-90 mb-6 text-xl font-medium tracking-wide text-nowrap">
                                                {item.title}
                                            </div>
                                            <Circle size={14} className="absolute top-4 left-4 text-gray-400" />
                                            <div className="absolute bottom-4 right-4 flex justify-center items-center h-8 w-8 text-writing border border-black hover:bg-[#111111] rounded-full">
                                                <ArrowRight size={16} className="text-writing hover:text-[#f4f0ec]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Sliding Panel */}
                        {openPanelId && (
                            <motion.div
                                className="absolute top-0 right-0 h-full bg-[#f4f0ec] text-[#111111] p-8 overflow-auto z-20 border-l border-[#111111]"
                                style={{ width: '100%' }} 
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x:'100%' }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            >
                                <div className="flex justify-start mb-4">
                                    <button onClick={closePanel} className="text-xl font-bold"><ArrowRight /></button>
                                </div>
                                {sideBar.find(item => item.id === openPanelId)?.content}
                            </motion.div>
                        )}
                    </div>
                    <div className="w-full h-[0.10rem] bg-lines"></div>
                    <div className="flex flex-row justify-between w-full h-[7vh] border-t border-[#111111] p-4">
                        <div>
                            <h2 className="text-writing basic-font text-[#111111]">PRIVACY</h2>
                        </div>
                        <div className="flex flex-row gap-1">
                            <span>
                                <Copyright />
                            </span>
                            <h2 className="text-writing font-basic uppercase">2024 salt hotels</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;