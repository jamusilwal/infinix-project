import { Smartphone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            New Launch
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Infinix 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Pro Max
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Experience the future of mobile technology. Powerful performance, stunning display, and exceptional camera capabilities in one revolutionary device.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#features" className="bg-blue-600 hover:bg-blue-700 transition-colors px-8 py-4 rounded-lg font-semibold">
              Explore Features
            </a>
            <a href="#specs" className="border border-slate-600 hover:border-slate-500 transition-colors px-8 py-4 rounded-lg font-semibold">
              View Specs
            </a>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-12 shadow-2xl border border-slate-700">
            <Smartphone className="w-48 h-48 md:w-64 md:h-64 text-blue-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
