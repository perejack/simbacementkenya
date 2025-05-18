import { ChevronLeft, ChevronRight, ShoppingBag, Award, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';

// Updated slides with more information and targeted content
const slides = [
  {
    image: 'https://simbacementkenya.com/wp-content/uploads/2024/06/SIMBA-CEMENT-3-e1645000022245-1024x681-1.png',
    title: 'Premium Cement Products',
    subtitle: 'Quality Building Materials For Every Project',
    cta: 'Shop Cement',
    description: 'Take advantage of our limited-time offers on all cement products',
    backgroundColor: 'from-blue-900 to-blue-700'
  },
  {
    image: 'https://fundilink.co.ke/wp-content/uploads/2022/08/Hollow-square.jpg',
    title: 'Special Deals on Steel',
    subtitle: 'Reinforcement Bars, Hollow Sections & More',
    cta: 'Explore Steel Products',
    description: 'High-quality steel products at competitive prices',
    backgroundColor: 'from-gray-900 to-gray-700'
  },
  {
    image: 'https://www.toptank.com/wp-content/uploads/2021/04/TopTank-Assorted-Products-1-01-e1617778778847-468x330.png',
    title: 'Water Tanks & Roofing',
    subtitle: 'Complete Solutions For Your Construction Needs',
    cta: 'View Collection',
    description: 'Free delivery on orders above KSh 10,000',
    backgroundColor: 'from-green-900 to-green-700'
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Function to handle slide transition
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Next and previous slide handlers
  const nextSlide = () => goToSlide((current + 1) % slides.length);
  const prevSlide = () => goToSlide((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    // Auto-advance slides
    const slideInterval = setInterval(nextSlide, 6000);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 60); // 6000ms / 100 steps = 60ms per step
    
    return () => {
      clearInterval(slideInterval);
      clearInterval(progressInterval);
    };
  }, [current]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [current]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-xl">
      {/* Mobile indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${current === index ? 'bg-white scale-125' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress bar (desktop) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full hidden md:block z-10">
        <div 
          className="h-full bg-white rounded-full transition-all" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Features bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-10 py-3 px-4 hidden md:block">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div className="flex items-center text-white">
            <ShoppingBag className="w-5 h-5 mr-2" />
            <span>Premium Quality Products</span>
          </div>
          <div className="flex items-center text-white">
            <Award className="w-5 h-5 mr-2" />
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center text-white">
            <Truck className="w-5 h-5 mr-2" />
            <span>Fast Nationwide Delivery</span>
          </div>
        </div>
      </div>
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-500 ease-in-out ${isAnimating ? 'transition-transform' : ''} ${
            index === current ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          }`}
          aria-hidden={index !== current}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.backgroundColor} opacity-70 mix-blend-multiply`}></div>
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-16 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg" 
                 style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-white mb-2 md:mb-4">{slide.subtitle}</p>
              <p className="text-white/90 text-sm md:text-base mb-4 md:mb-8">{slide.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 duration-200 transform">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 p-2 rounded-full transition-colors z-10 text-gray-800 hidden md:block"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 p-2 rounded-full transition-colors z-10 text-gray-800 hidden md:block"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}