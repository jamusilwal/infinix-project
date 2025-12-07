import { useState } from 'react';
import { ChevronLeft, ChevronRight, Palette, Sparkles, Zap } from 'lucide-react';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      id: 1,
      color: 'from-slate-700 to-slate-900',
      gradient: 'from-slate-500/20 to-slate-700/20',
      name: 'Midnight Black',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: 2,
      color: 'from-blue-600 to-blue-800',
      gradient: 'from-blue-400/20 to-blue-600/20',
      name: 'Ocean Blue',
      icon: <Palette className="w-6 h-6" />
    },
    {
      id: 3,
      color: 'from-purple-600 to-pink-600',
      gradient: 'from-purple-400/20 to-pink-400/20',
      name: 'Aurora Purple',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 4,
      color: 'from-emerald-600 to-teal-700',
      gradient: 'from-emerald-400/20 to-teal-500/20',
      name: 'Forest Green',
      icon: <Palette className="w-6 h-6" />
    },
    {
      id: 5,
      color: 'from-rose-500 to-orange-500',
      gradient: 'from-rose-300/20 to-orange-400/20',
      name: 'Sunset Gold',
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Available Colors
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose from our stunning collection of premium finishes
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image) => (
                <div key={image.id} className="min-w-full flex justify-center items-center py-12">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} rounded-full blur-3xl`}></div>
                    <div className={`relative bg-gradient-to-br ${image.color} rounded-3xl w-64 h-96 md:w-80 md:h-[500px] shadow-2xl flex items-center justify-center border border-white/10`}>
                      <div className="absolute top-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                      <div className="text-white/30 text-8xl font-bold">X</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full p-3 shadow-lg transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full p-3 shadow-lg transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-slate-900 dark:text-white" />
          </button>

          <div className="flex justify-center items-center gap-6 mt-12">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`group flex flex-col items-center gap-2 transition-all ${
                  currentIndex === index ? 'scale-110' : 'opacity-50 hover:opacity-75'
                }`}
                aria-label={`Go to ${image.name}`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${image.color} border-2 ${
                    currentIndex === index
                      ? 'border-blue-600 dark:border-blue-400'
                      : 'border-transparent'
                  } shadow-lg flex items-center justify-center`}
                >
                  <span className="text-white text-xs">{image.icon}</span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                  {image.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
