import { useState } from 'react';
import { Cpu, Camera, Battery, Monitor, ChevronDown, ChevronUp } from 'lucide-react';

export default function Features() {
  const [expandedId, setExpandedId] = useState(null);

  const features = [
    {
      id: 'processor',
      icon: <Cpu className="w-8 h-8" />,
      title: 'Next-Gen Processor',
      subtitle: 'A17 Pro Chip',
      description: 'Experience lightning-fast performance with our latest processor technology.',
      details: [
        '6-core CPU with 2 performance and 4 efficiency cores',
        '6-core GPU for immersive gaming',
        '16-core Neural Engine for advanced AI tasks',
        'Up to 20% faster than previous generation'
      ]
    },
    {
      id: 'camera',
      icon: <Camera className="w-8 h-8" />,
      title: 'Pro Camera System',
      subtitle: 'Triple 48MP Lenses',
      description: 'Capture stunning photos and videos in any lighting condition.',
      details: [
        '48MP main camera with sensor-shift stabilization',
        '48MP ultra-wide camera with macro capabilities',
        '12MP telephoto lens with 5x optical zoom',
        'Night mode and computational photography',
        '8K video recording at 30fps'
      ]
    },
    {
      id: 'battery',
      icon: <Battery className="w-8 h-8" />,
      title: 'All-Day Battery',
      subtitle: '5000mAh Capacity',
      description: 'Power through your day without worrying about charging.',
      details: [
        'Up to 29 hours video playback',
        'Up to 95 hours audio playback',
        '65W fast charging (0-50% in 15 minutes)',
        'Wireless charging support',
        'Reverse wireless charging for accessories'
      ]
    },
    {
      id: 'display',
      icon: <Monitor className="w-8 h-8" />,
      title: 'ProMotion Display',
      subtitle: '6.7" OLED, 120Hz',
      description: 'Immersive viewing experience with stunning colors and smooth scrolling.',
      details: [
        '6.7-inch Super Retina XDR OLED display',
        'Adaptive 120Hz refresh rate (1-120Hz)',
        '2796 x 1290 resolution at 460 ppi',
        'HDR10+ and Dolby Vision support',
        'Peak brightness 2000 nits',
        'Always-On display technology'
      ]
    }
  ];

  const toggleFeature = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver exceptional performance and user experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-600 text-white rounded-xl p-3">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {feature.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {feature.description}
              </p>

              <button
                onClick={() => toggleFeature(feature.id)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
              >
                {expandedId === feature.id ? 'Show Less' : 'Learn More'}
                {expandedId === feature.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === feature.id ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <ul className="space-y-2">
                  {feature.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
