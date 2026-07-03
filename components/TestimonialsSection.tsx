'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Star, Quote, ArrowRight, 
  User, Mail, Phone, TrendingUp, Sparkles, CheckCircle2 
} from 'lucide-react';

// --- MOCK DATA ---
const successStories = [
  {
    name: 'Arsalan Nadeem',
    role: 'Day Trader',
    quote: "I made my first $400 profit within 3 weeks of completing the course. The live sessions were game-changing.",
    rating: 5,
    image: '/1.jpeg'
  },
  {
    name: 'Ayesha Malik',
    role: 'Swing Trader',
    quote: "Skills Aura didn't just teach me trading — it taught me discipline. I'm now consistently profitable and managing my own portfolio.",
    rating: 5,
    image: '/2.jpeg'
  },
  {
    name: 'Zain Ahmed',
    role: 'Crypto Analyst',
    quote: "The risk management modules saved my account. Before this, I was gambling. Now, I have a systematic edge in the markets.",
    rating: 5,
    image: '/6.jpeg'
  },
  {
    name: 'Haider Shah',
    role: 'Forex Trader',
    quote: "Transitioning from a 9-to-5 to full-time trading seemed impossible. The mentorship here gave me the roadmap to actually do it.",
    rating: 5,
    image: '/4.jpeg'
  }
];

const blogs = [
  'What Is Forex Trading? A Beginners Guide',
  '5 Common Mistakes New Traders Make',
  'Why Most Beginners Fail in Trading',
];

export default function GrowthSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const nextStory = () => setCurrentIndex((prev) => (prev + 1) % successStories.length);
  const prevStory = () => setCurrentIndex((prev) => (prev - 1 + successStories.length) % successStories.length);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate API call
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="growth" className="w-full py-24 px-6 md:px-20 bg-black border-t border-white/5 relative z-20 overflow-hidden font-sans text-white">
      
      {/* --- ENHANCED BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
      <div className="absolute left-0 top-0 w-full md:w-[800px] h-[800px] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none -translate-x-1/4 -translate-y-1/4 z-0" />
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

        {/* --- LEFT COLUMN: Testimonials + Blogs (7 Columns) --- */}
        <div className="lg:col-span-7 space-y-24">
          
          {/* SUCCESS STORIES SLIDER */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span> Proven Results
              </p>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 scale-y-110 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Success Stories
              </h3>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-10 min-h-[320px] flex flex-col justify-between group hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(147,51,234,0.15)] transition-all duration-500 overflow-hidden backdrop-blur-sm">
              
              <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/[0.02] group-hover:text-purple-500/[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 flex-1 flex flex-col justify-center"
                >
                  <div className="flex gap-1.5 mb-6">
                    {[...Array(successStories[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500 drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg italic text-gray-200 mb-10 leading-relaxed font-medium">
                    "{successStories[currentIndex].quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative">
                      {/* Glow behind image */}
                      <div className="absolute inset-0 bg-purple-500 blur-md opacity-40 rounded-full"></div>
                      <img 
                        src={successStories[currentIndex].image} 
                        alt={successStories[currentIndex].name}
                        className="relative w-14 h-14 rounded-full object-cover border-2 border-white/10"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-wide">{successStories[currentIndex].name}</p>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mt-1">{successStories[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls & Action Button */}
            <div className="flex items-center justify-between mt-8">
              <button className="group flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest bg-purple-600/20 hover:bg-purple-600/40 px-5 py-3 rounded-full border border-purple-500/30 transition-all duration-300">
                View All Stories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={prevStory}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all group backdrop-blur-md"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
                <button 
                  onClick={nextStory}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all group backdrop-blur-md"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* BLOGS LIST */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 scale-y-110 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Latest Insights
              </h3>
            </motion.div>
            
            <div className="space-y-2 mb-8">
              {blogs.map((blog, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-purple-500/30 p-5 rounded-2xl transition-all duration-300 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors mb-2">{blog}</h4>
                    <p className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">Read Article</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-white/5 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="group flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors w-fit">
              Explore Resource Center <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Premium Consultation Form (5 Columns) --- */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <div className="bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_80px_rgba(147,51,234,0.1)] relative overflow-hidden backdrop-blur-xl">
              
              {/* Form Header */}
              <div className="mb-8">
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 text-white scale-y-110">
                  Book a Strategy Call
                </h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Ready to elevate your trading? Schedule a free 1-on-1 consultation with our senior analysts.
                </p>
              </div>

              {formState === 'success' ? (
                /* SUCCESS STATE */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Request Received</h4>
                  <p className="text-sm text-gray-400 mb-8">Our team will contact you shortly to confirm your time slot.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-[10px] uppercase tracking-widest font-bold text-purple-400 hover:text-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                /* FORM FIELDS */
                <form onSubmit={handleConsultationSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe" 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-purple-500 focus:bg-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com" 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-purple-500 focus:bg-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                      <input 
                        type="tel" 
                        required
                        placeholder="+1 (555) 000-0000" 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-purple-500 focus:bg-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Trading Experience</label>
                    <div className="relative group">
                      <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                      <select 
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-purple-500 focus:bg-black transition-all cursor-pointer"
                      >
                        <option value="" disabled selected className="text-gray-700">Select Experience Level</option>
                        <option value="beginner" className="bg-[#111]">Beginner (0-1 years)</option>
                        <option value="intermediate" className="bg-[#111]">Intermediate (1-3 years)</option>
                        <option value="advanced" className="bg-[#111]">Advanced (3+ years)</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState === 'loading'}
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest py-5 rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {formState === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Claim Your Free Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-4">100% Free. No commitment required.</p>
                </form>
              )}
            </div>

            {/* Trust Badges below form */}
            <div className="mt-10 flex flex-col items-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">Trusted By Institutions</p>
              <div className="flex justify-center gap-8 opacity-40 grayscale">
                <div className="text-sm font-black tracking-tighter uppercase">Binance</div>
                <div className="text-sm font-black tracking-tighter uppercase">MetaTrader</div>
                <div className="text-sm font-black tracking-tighter uppercase">TradingView</div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}