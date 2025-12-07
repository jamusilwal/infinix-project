import { useState } from 'react';

export default function Specifications() {
  const [activeTab, setActiveTab] = useState('display');

  const categories = [
    {
      id: 'display',
      name: 'Display',
      specs: [
        { label: 'Screen Size', value: '6.7 inches' },
        { label: 'Resolution', value: '2796 x 1290 pixels' },
        { label: 'Technology', value: 'Super Retina XDR OLED' },
        { label: 'Refresh Rate', value: 'Adaptive 120Hz (1-120Hz)' },
        { label: 'Brightness', value: '2000 nits peak' },
        { label: 'HDR Support', value: 'HDR10+, Dolby Vision' },
        { label: 'Pixel Density', value: '460 ppi' },
        { label: 'Protection', value: 'Ceramic Shield glass' }
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      specs: [
        { label: 'Processor', value: 'A17 Pro (3nm)' },
        { label: 'CPU', value: '6-core (2P + 4E)' },
        { label: 'GPU', value: '6-core GPU' },
        { label: 'Neural Engine', value: '16-core' },
        { label: 'RAM', value: '8GB' },
        { label: 'Storage Options', value: '256GB / 512GB / 1TB' },
        { label: 'Performance Boost', value: '20% faster than A16' },
        { label: 'AI Capabilities', value: '35 trillion ops/sec' }
      ]
    },
    {
      id: 'camera',
      name: 'Camera',
      specs: [
        { label: 'Main Camera', value: '48MP, f/1.78, sensor-shift OIS' },
        { label: 'Ultra Wide', value: '48MP, f/2.2, macro' },
        { label: 'Telephoto', value: '12MP, f/2.8, 5x optical zoom' },
        { label: 'Front Camera', value: '12MP, f/1.9' },
        { label: 'Video Recording', value: '8K at 30fps, 4K at 60fps' },
        { label: 'Stabilization', value: 'Sensor-shift + Digital' },
        { label: 'Night Mode', value: 'All cameras' },
        { label: 'Photo Formats', value: 'HEIF, RAW, ProRAW' }
      ]
    },
    {
      id: 'battery',
      name: 'Battery & Charging',
      specs: [
        { label: 'Battery Capacity', value: '5000 mAh' },
        { label: 'Video Playback', value: 'Up to 29 hours' },
        { label: 'Audio Playback', value: 'Up to 95 hours' },
        { label: 'Wired Charging', value: '65W (0-50% in 15 min)' },
        { label: 'Wireless Charging', value: '15W MagSafe' },
        { label: 'Reverse Charging', value: '5W wireless' },
        { label: 'Charging Port', value: 'USB-C (USB 3.2)' },
        { label: 'Power Adapter', value: 'Sold separately' }
      ]
    },
    {
      id: 'connectivity',
      name: 'Connectivity',
      specs: [
        { label: '5G', value: 'Sub-6GHz and mmWave' },
        { label: 'Wi-Fi', value: 'Wi-Fi 6E (802.11ax)' },
        { label: 'Bluetooth', value: '5.3' },
        { label: 'NFC', value: 'Yes, with reader mode' },
        { label: 'Ultra Wideband', value: 'UWB chip (Gen 2)' },
        { label: 'SIM', value: 'Dual SIM (nano + eSIM)' },
        { label: 'GPS', value: 'GPS, GLONASS, Galileo, QZSS' },
        { label: 'Emergency SOS', value: 'Satellite connectivity' }
      ]
    },
    {
      id: 'design',
      name: 'Design & Build',
      specs: [
        { label: 'Dimensions', value: '159.9 x 76.7 x 8.25 mm' },
        { label: 'Weight', value: '221 grams' },
        { label: 'Materials', value: 'Titanium frame, glass back' },
        { label: 'Water Resistance', value: 'IP68 (6m for 30 min)' },
        { label: 'Colors', value: '5 premium finishes' },
        { label: 'Buttons', value: 'Action button + volume' },
        { label: 'Speakers', value: 'Stereo speakers' },
        { label: 'Face ID', value: 'TrueDepth camera system' }
      ]
    }
  ];

  const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  return (
    <section id="specs" className="py-20 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Technical Specifications
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every detail engineered to perfection
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="flex overflow-x-auto bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                  activeTab === category.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {activeCategory.specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-4 py-3 border-b border-slate-200 dark:border-slate-700 last:border-0"
                >
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    {spec.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Specifications are subject to change. Actual battery life varies by use and configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
