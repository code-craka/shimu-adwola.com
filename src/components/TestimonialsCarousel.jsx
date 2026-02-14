
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (loading || error || testimonials.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, loading, error, testimonials.length, isHovered]);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(false);
    console.log('🔄 Fetching testimonials...');
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ Supabase Testimonials Error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      if (data && data.length > 0) {
        console.log(`✅ Loaded ${data.length} testimonials`);
        setTestimonials(data);
      } else {
        console.log('⚠️ No testimonials found in database, using fallback');
        throw new Error('No data');
      }
    } catch (err) {
      console.warn('⚠️ Falling back to default testimonials due to error or empty data:', err.message);
      setError(true);
      // Fallback data
      setTestimonials([
        {
          id: '1',
          client_name: 'Sarah Jenkins',
          company: 'Apex Financial Solutions',
          role: 'Director of Operations',
          feedback: 'Adwola completely transformed how we handle our month-end close. What used to take us 5 days now takes less than one. The ROI was immediate.',
          rating: 5,
          image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
        },
        {
          id: '2',
          client_name: 'Michael Chen',
          company: 'TechFlow Systems',
          role: 'CFO',
          feedback: 'The payment reconciliation automation saved us from hiring two additional staff members. The accuracy is 100%, which is unheard of in manual processing.',
          rating: 5,
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="w-full h-80 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#C5A23E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm font-medium">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-12 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative border border-[#C5A23E]/10">
              <div className="absolute top-8 left-8 text-[#C5A23E]/20 hidden sm:block">
                <Quote size={64} fill="currentColor" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {testimonials[currentIndex].image_url ? (
                  <div className="w-20 h-20 rounded-full border-2 border-[#C5A23E] p-1 mb-6">
                    <img 
                      src={testimonials[currentIndex].image_url} 
                      alt={testimonials[currentIndex].client_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#1A1A2E] text-[#C5A23E] flex items-center justify-center text-2xl font-bold mb-6 border-2 border-[#C5A23E]">
                    {testimonials[currentIndex].client_name.charAt(0)}
                  </div>
                )}
                
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < testimonials[currentIndex].rating ? "text-[#C5A23E] fill-[#C5A23E]" : "text-gray-300"} 
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-[#1A1A2E] font-medium italic mb-8 leading-relaxed">
                  "{testimonials[currentIndex].feedback}"
                </p>

                <div className="mt-auto">
                  <h4 className="text-lg font-bold text-[#1A1A2E]">
                    {testimonials[currentIndex].client_name}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-[#1A1A2E] hover:text-[#C5A23E] hover:bg-gray-50 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-[#C5A23E]"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-[#1A1A2E] hover:text-[#C5A23E] hover:bg-gray-50 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-[#C5A23E]"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#C5A23E] w-6' : 'bg-gray-300 hover:bg-[#C5A23E]/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
