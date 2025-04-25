import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SlideData = {
  id: number;
  image: string;
  alt: string;
};

const slides: SlideData[] = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    alt: "Naploo Pod Hotel",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1787&q=80",
    alt: "BIDUA Beauty Care",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80",
    alt: "BIDUA CloudDrive",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1747&q=80",
    alt: "BIDUA OEM Solutions",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80",
    alt: "BIDUA IT Connect",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn("hero-slide", currentSlide === index && "active")}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={currentSlide !== index}
        >
          <div className="gradient-overlay flex items-center justify-center w-full h-full">
            <div className="container mx-auto px-4 pt-20">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1
                  className="text-3xl md:text-5xl font-bold mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  BIDUA Industries Pvt Ltd
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl font-semibold mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Empowering Innovation Across Industries
                </motion.p>
                <motion.p
                  className="text-lg mb-12 opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Hospitality, Beauty, Technology, Manufacturing, and Digital Solutions — All from One Visionary Platform.
                </motion.p>
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href="#divisions">
                    <Button variant="default" size="lg" className="cta-button">
                      Explore Divisions
                    </Button>
                  </Link>
                  <Link href="/investor">
                    <Button variant="outline" size="lg" className="cta-button">
                      Invest in Naploo™
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button variant="secondary" size="lg" className="cta-button">
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex space-x-3">
          {slides.map((slide) => (
            <button
              key={slide.id}
              className={cn(
                "w-3 h-3 bg-white bg-opacity-50 rounded-full transition-all",
                currentSlide === slide.id && "bg-opacity-100 w-6"
              )}
              onClick={() => goToSlide(slide.id)}
              aria-label={`Go to slide ${slide.id + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
