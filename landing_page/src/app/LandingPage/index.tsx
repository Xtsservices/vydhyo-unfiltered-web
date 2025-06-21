"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Truck, Droplets, Home } from "lucide-react";

const carouselData = [
    {
        id: 1,
        title: "Book Appointments",
        subtitle: "Schedule with Ease",
        description: "Connect with top-rated Indian doctors and specialists instantly. Book appointments 24/7 with our smart scheduling system and get confirmed slots within minutes.",
        features: ["Instant Booking", "Top Doctors", "24/7 Availability", "Smart Scheduling"],
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop&crop=face",
        icon: <Calendar className="w-8 h-8" />,
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)"
    },
    {
        id: 2,
        title: "Verified Ambulance Services",
        subtitle: "Immediate Medical Attention",
        description: "Fast, reliable emergency medical services with certified Indian doctors. Our emergency network ensures you get immediate medical attention when every second counts.",
        features: ["24/7 Emergency", "Certified Doctors", "Quick Response", "Advanced Care"],
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&crop=face",
        icon: <Truck className="w-8 h-8" />,
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)"
    },
    {
        id: 3,
        title: "Live Blood Bank Updates",
        subtitle: "Traditional Healing",
        description: "Connect with Ayurvedic specialists for holistic consultations. Get expert advice and treatment plans based on India's ancient medical wisdom.",
        features: ["Holistic Approach", "Natural Remedies", "Personalized Care", "Wellness Plans"],
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=500&fit=crop&crop=face",
        icon: <Droplets className="w-8 h-8" />,
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)"
    },
    {
        id: 4,
        title: "Certified Home Healthcare",
        subtitle: "Comprehensive Tests",
        description: "Complete health checkup packages with certified Indian medical professionals. Get accurate results and professional analysis for your wellness.",
        features: ["Full Body Checkup", "Preventive Care", "Accurate Results", "Professional Analysis"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=500&fit=crop&crop=face",
        icon: <Home className="w-8 h-8" />,
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)"
    }
];

const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating medical icons */}
            <div className="absolute top-20 left-20 opacity-10 animate-float-slow">
                <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
            </div>
            <div className="absolute top-1/3 right-32 opacity-15 animate-float-medium">
                <svg className="w-10 h-10 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 8H17V6A5 5 0 0 0 7 6V8H5A3 3 0 0 0 2 11V19A3 3 0 0 0 5 22H19A3 3 0 0 0 22 19V11A3 3 0 0 0 19 8M9 6A3 3 0 0 1 15 6V8H9V6Z"/>
                </svg>
            </div>
            <div className="absolute bottom-32 left-1/4 opacity-12 animate-float-fast">
                <svg className="w-14 h-14 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,6V12.4L16.2,15.4L17,14.1L12.5,11.5V6H11Z"/>
                </svg>
            </div>
            
            {/* Geometric shapes with smooth motion */}
            <div className="absolute top-1/4 left-1/6 opacity-8">
                <div className="w-20 h-20 border-2 border-blue-200 rounded-lg rotate-45 animate-rotate-slow"></div>
            </div>
            <div className="absolute bottom-1/4 right-1/5 opacity-10">
                <div className="w-16 h-16 border-2 border-blue-300 rounded-full animate-scale-pulse"></div>
            </div>
            
            {/* DNA Helix animation */}
            <div className="absolute top-1/2 left-12 opacity-8 animate-twist">
                <div className="relative w-8 h-32">
                    <div className="absolute w-2 h-2 bg-blue-300 rounded-full top-0 left-0 animate-dna-1"></div>
                    <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-4 right-0 animate-dna-2"></div>
                    <div className="absolute w-2 h-2 bg-blue-300 rounded-full top-8 left-0 animate-dna-1"></div>
                    <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-12 right-0 animate-dna-2"></div>
                    <div className="absolute w-2 h-2 bg-blue-300 rounded-full top-16 left-0 animate-dna-1"></div>
                    <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-20 right-0 animate-dna-2"></div>
                </div>
            </div>
            
            {/* Heartbeat line animation */}
            <div className="absolute bottom-20 right-20 opacity-15">
                <svg className="w-32 h-8 text-blue-400" viewBox="0 0 128 32">
                    <path className="animate-heartbeat" fill="none" stroke="currentColor" strokeWidth="2" 
                          d="M0,16 L20,16 L25,8 L30,24 L35,16 L40,16 L45,12 L50,20 L55,16 L128,16"/>
                </svg>
            </div>
            
            {/* Particle system */}
            <div className="absolute top-16 right-16 opacity-20">
                <div className="relative w-24 h-24">
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle-1"></div>
                    <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-particle-2"></div>
                    <div className="absolute w-1 h-1 bg-blue-500 rounded-full animate-particle-3"></div>
                    <div className="absolute w-1 h-1 bg-blue-200 rounded-full animate-particle-4"></div>
                </div>
            </div>
            
            {/* Flowing lines */}
            <div className="absolute inset-0">
                <svg className="w-full h-full opacity-5" viewBox="0 0 1200 800">
                    <path className="animate-flow-1" fill="none" stroke="url(#gradient1)" strokeWidth="2"
                          d="M0,400 Q300,200 600,400 T1200,400"/>
                    <path className="animate-flow-2" fill="none" stroke="url(#gradient2)" strokeWidth="1"
                          d="M0,300 Q400,100 800,300 T1200,300"/>
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0"/>
                            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

const FloatingElements = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Subtle accent particles */}
            <div className="absolute top-1/5 left-1/3 opacity-15">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
            </div>
            <div className="absolute top-2/3 right-1/4 opacity-10">
                <div className="w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            </div>
            <div className="absolute bottom-1/3 left-1/5 opacity-12">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>
        </div>
    );
};

const HealthcareCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // Increased to 5 seconds for better viewing

        return () => clearInterval(interval);
    }, [currentSlide]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const currentData = carouselData[currentSlide];
    const isEven = currentSlide % 2 === 0;

    return (
        <>
        <style jsx>{`
            @keyframes float-slow {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
            }
            @keyframes float-medium {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                33% { transform: translateY(-15px) translateX(10px); }
                66% { transform: translateY(-5px) translateX(-5px); }
            }
            @keyframes float-fast {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-25px) scale(1.1); }
            }
            @keyframes rotate-slow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes scale-pulse {
                0%, 100% { transform: scale(1); opacity: 0.1; }
                50% { transform: scale(1.2); opacity: 0.2; }
            }
            @keyframes twist {
                0% { transform: rotateY(0deg); }
                100% { transform: rotateY(360deg); }
            }
            @keyframes dna-1 {
                0%, 100% { transform: translateX(0px) translateY(0px); }
                50% { transform: translateX(20px) translateY(-5px); }
            }
            @keyframes dna-2 {
                0%, 100% { transform: translateX(0px) translateY(0px); }
                50% { transform: translateX(-20px) translateY(5px); }
            }
            @keyframes heartbeat {
                0%, 100% { stroke-dasharray: 0, 1000; stroke-dashoffset: 0; }
                50% { stroke-dasharray: 100, 1000; stroke-dashoffset: -200; }
            }
            @keyframes particle-1 {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(60px, -30px) scale(0); opacity: 0; }
            }
            @keyframes particle-2 {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(-40px, -50px) scale(0); opacity: 0; }
            }
            @keyframes particle-3 {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(30px, 40px) scale(0); opacity: 0; }
            }
            @keyframes particle-4 {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(-60px, 20px) scale(0); opacity: 0; }
            }
            @keyframes flow-1 {
                0% { stroke-dasharray: 0, 2000; }
                100% { stroke-dasharray: 200, 2000; }
            }
            @keyframes flow-2 {
                0% { stroke-dasharray: 0, 1500; stroke-dashoffset: 0; }
                100% { stroke-dasharray: 150, 1500; stroke-dashoffset: -300; }
            }
            
            .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
            .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
            .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
            .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
            .animate-scale-pulse { animation: scale-pulse 4s ease-in-out infinite; }
            .animate-twist { animation: twist 15s linear infinite; }
            .animate-dna-1 { animation: dna-1 3s ease-in-out infinite; }
            .animate-dna-2 { animation: dna-2 3s ease-in-out infinite 1.5s; }
            .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
            .animate-particle-1 { animation: particle-1 4s linear infinite; }
            .animate-particle-2 { animation: particle-2 4s linear infinite 1s; }
            .animate-particle-3 { animation: particle-3 4s linear infinite 2s; }
            .animate-particle-4 { animation: particle-4 4s linear infinite 3s; }
            .animate-flow-1 { animation: flow-1 8s ease-in-out infinite; }
            .animate-flow-2 { animation: flow-2 10s ease-in-out infinite 2s; }
        `}</style>
        
        <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-25 to-blue-50 overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            <AnimatedBackground />
            <FloatingElements />
            
            {/* Enhanced background animated shapes */}
            <div className="absolute inset-0">
                <div 
                    className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 animate-pulse"
                    style={{ 
                        background: currentData.gradient,
                        transform: `translate(${isEven ? '-50px' : '50px'}, -50px)`,
                        transition: 'all 0.8s ease-in-out'
                    }}
                ></div>
                <div 
                    className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 animate-pulse"
                    style={{ 
                        background: currentData.gradient,
                        transform: `translate(${isEven ? '50px' : '-50px'}, 50px)`,
                        transition: 'all 0.8s ease-in-out',
                        animationDelay: '0.5s'
                    }}
                ></div>
                
                {/* Additional animated background elements */}
                <div 
                    className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full opacity-5 animate-ping"
                    style={{ 
                        background: currentData.gradient,
                        transform: 'translate(-50%, -50%)',
                        animationDuration: '8s'
                    }}
                ></div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Main content */}
            <div className="relative z-10 h-screen flex items-center justify-center px-8">
                <div className={`w-full max-w-7xl mx-auto flex items-center gap-16 ${!isEven ? 'flex-row-reverse' : ''}`}>
                    
                    {/* Content Side */}
                    <div className={`flex-1 space-y-8 ${isAnimating ? 'animate-pulse' : ''}`}>
                        <div 
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full shadow-lg transform transition-all duration-700 hover:scale-105"
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <div style={{ color: currentData.color }}>
                                {currentData.icon}
                            </div>
                            <span className="text-sm font-semibold text-gray-800" style={{ fontSize: '14px' }}>{currentData.subtitle}</span>
                        </div>

                        <h1 
                            className="text-5xl font-extrabold leading-tight transition-all duration-700"
                            style={{ color: currentData.color }}
                        >
                            {currentData.title}
                        </h1>
                        
                        <p className="text-gray-600 leading-relaxed max-w-2xl" style={{ fontSize: '16px' }}>
                            {currentData.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            {currentData.features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/90"
                                >
                                    <div 
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: currentData.color }}
                                    ></div>
                                    <span className="font-medium text-gray-700" style={{ fontSize: '14px' }}>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            className="px-8 py-3 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                            style={{ 
                                background: currentData.gradient,
                                fontSize: '16px',
                                boxShadow: `0 4px 15px ${currentData.color}40`
                            }}
                        >
                            Get Started Now
                        </button>
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 relative flex justify-center">
                        <div 
                            className="absolute inset-0 rounded-full blur-sm transition-all duration-700"
                            style={{ 
                                background: currentData.gradient,
                                transform: 'translate(20px, 20px)',
                                opacity: 0.3,
                                width: '500px',
                                height: '500px',
                                margin: '0 auto'
                            }}
                        ></div>
                        <img
                            src={currentData.image}
                            alt={currentData.title}
                            className={`relative z-10 w-[500px] h-[500px] object-cover rounded-full shadow-2xl transition-all duration-700 transform ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
                            style={{
                                border: `8px solid ${currentData.color}20`,
                                boxShadow: `0 10px 30px ${currentData.color}40`
                            }}
                        />
                        
                        {/* Floating stats */}
                        <div 
                            className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl z-20 transition-all duration-700"
                            style={{ 
                                transform: isAnimating ? 'translateY(10px)' : 'translateY(0px)',
                                opacity: isAnimating ? 0.8 : 1,
                                boxShadow: `0 5px 20px ${currentData.color}20`
                            }}
                        >
                            <div className="text-2xl font-bold" style={{ color: currentData.color }}>
                                {currentSlide === 0 ? '24/7' : currentSlide === 1 ? '5min' : currentSlide === 2 ? '100%' : '500+'}
                            </div>
                            <div className="text-xs text-gray-600" style={{ fontSize: '12px' }}>
                                {currentSlide === 0 ? 'Available' : currentSlide === 1 ? 'Response' : currentSlide === 2 ? 'Verified' : 'Doctors'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {carouselData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'w-12 shadow-lg' 
                                : 'w-3 bg-white/60 hover:bg-white/80'
                        }`}
                        style={{
                            backgroundColor: index === currentSlide ? currentData.color : undefined,
                            boxShadow: index === currentSlide ? `0 2px 8px ${currentData.color}60` : undefined
                        }}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200/50 z-20">
                <div 
                    className="h-full transition-all duration-300 ease-linear"
                    style={{ 
                        width: `${((currentSlide + 1) / carouselData.length) * 100}%`,
                        background: currentData.gradient,
                        boxShadow: `0 0 10px ${currentData.color}60`
                    }}
                />
            </div>
        </div>
        </>
    );
};

export default HealthcareCarousel;