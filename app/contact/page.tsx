"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaTelegramPlane, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaChevronDown, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { FiClock, FiArrowUpRight, FiBookOpen, FiCalendar, FiCreditCard, FiMessageCircle } from 'react-icons/fi';

const FAQS = [
  {
    question: "How do I enroll in a course?",
    answer: "You can enroll by visiting our Courses page, selecting your desired program, and clicking 'Enroll Now'. The system will guide you through batch selection and the secure payment process."
  },
  {
    question: "How do I select a batch?",
    answer: "During checkout, our CRM will automatically display available city-based physical batches and online cohorts. Simply select the one that fits your schedule and location."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept major credit/debit cards, local bank transfers, and popular mobile wallets. All transactions are securely processed and instantly updated in your student dashboard."
  },
  {
    question: "Can I change my batch after enrollment?",
    answer: "Yes, batch transfers are possible within the first week of enrollment, subject to seat availability. Please submit a 'Technical Support' request through this contact form."
  },
  {
    question: "How do I contact support directly?",
    answer: "You can use the form on this page, email us at support@skillsaura.com, or reach out instantly via our dedicated WhatsApp support line."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    subject: 'Course Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        source: 'Contact Page',
        timestamp: new Date().toISOString()
      };

      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Sent to CRM:", payload);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', city: '', subject: 'Course Inquiry', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white pb-20">
      
      {/* 1. HERO SECTION - Added Top Radial Gradient */}
      <section className="relative w-full pt-32 pb-20 px-6 md:px-20 overflow-hidden z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#05020a] to-[#020202]">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50vh] bg-purple-900/30 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <motion.div 
          className="relative z-20 max-w-4xl mx-auto text-center"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            24/7 Support Network
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white drop-shadow-2xl scale-y-110 leading-[0.9]">
            GET IN TOUCH WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">SKILLS AURA</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            We’re here to help you with courses, enrollment, payments, and mentorship guidance. Reach out to our dedicated support team today.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/enroll" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-2">
              Apply Now
            </a>
            <a href="/consultation" className="bg-[#111] border border-white/10 text-white hover:bg-white/5 text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              Talk to Advisor
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2 & 3. CONTACT INFO AND FORM - Added Subtle Background Gradient */}
      <section className="relative w-full py-10 bg-gradient-to-b from-[#020202] via-[#050208] to-[#020202]">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
          
          {/* LEFT COLUMN: CONTACT INFO */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          >
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 scale-y-110">Contact Information</h2>
              <p className="text-purple-200/60 text-sm">Our headquarters and dedicated support channels.</p>
            </div>

            <div className="space-y-4">
              {/* Added deeper gradients to individual cards */}
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0a0514] to-[#05020a] border border-white/5 p-6 rounded-2xl flex items-start gap-5 hover:border-purple-500/30 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-purple-400 text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Headquarters</h4>
                  <p className="text-white text-sm font-medium">Karachi, Pakistan</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0a0514] to-[#05020a] border border-white/5 p-6 rounded-2xl flex items-start gap-5 hover:border-purple-500/30 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <FaPhone className="text-purple-400 text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Phone Line</h4>
                  <p className="text-white text-sm font-medium">+92 300 1234567</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0a0514] to-[#05020a] border border-white/5 p-6 rounded-2xl flex items-start gap-5 hover:border-purple-500/30 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-purple-400 text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email Support</h4>
                  <p className="text-white text-sm font-medium">support@skillsaura.com</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0a0514] to-[#05020a] border border-white/5 p-6 rounded-2xl flex items-start gap-5 hover:border-purple-500/30 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <FiClock className="text-purple-400 text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Operating Hours</h4>
                  <p className="text-white text-sm font-medium">Mon – Sat (10:00 AM – 7:00 PM)</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="flex gap-4 pt-4">
              <a href="#" className="flex-1 bg-green-600/10 border border-green-500/30 hover:bg-green-600 text-green-500 hover:text-white transition-all rounded-xl py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <FaWhatsapp className="text-lg" /> WhatsApp
              </a>
              <a href="#" className="flex-1 bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600 text-blue-500 hover:text-white transition-all rounded-xl py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <FaTelegramPlane className="text-lg" /> Telegram
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM - Added deeper glassmorphism gradient */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-[#0c0518]/90 to-[#020202]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_0_50px_rgba(147,51,234,0.1)] h-full">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="text-5xl text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Message Sent</h3>
                  <p className="text-gray-400 text-sm max-w-sm">Your message has been successfully logged in our CRM. Our branch or super admin team will respond shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-purple-300/70 ml-1">Full Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all shadow-inner" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-purple-300/70 ml-1">Email Address</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all shadow-inner" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-purple-300/70 ml-1">Phone Number</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all shadow-inner" placeholder="+92 300 0000000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-purple-300/70 ml-1">City (For Branch Routing)</label>
                      <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all shadow-inner" placeholder="e.g. Lahore" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-purple-300/70 ml-1">Subject</label>
                    <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer shadow-inner">
                      <option value="Course Inquiry">Course Inquiry</option>
                      <option value="Batch Info">Batch Info</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="General Query">General Query</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-purple-300/70 ml-1">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all resize-none shadow-inner" placeholder="How can we help you today?"></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-200 hover:to-gray-300 disabled:from-gray-600 disabled:to-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-sm font-black uppercase tracking-widest py-5 rounded-xl transition-all flex items-center justify-center gap-3 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    {loading ? <><FaSpinner className="animate-spin text-lg" /> Submitting to CRM...</> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. QUICK ACTION SECTION - Upgraded Borders */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-24 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Explore Courses", icon: <FiBookOpen />, link: "/courses", color: "text-purple-400", borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]" },
            { title: "View Batches", icon: <FiCalendar />, link: "/batches", color: "text-blue-400", borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
            { title: "Payment Help", icon: <FiCreditCard />, link: "/faq", color: "text-emerald-400", borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]" },
            { title: "Talk to Advisor", icon: <FiMessageCircle />, link: "#whatsapp", color: "text-amber-400", borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]" }
          ].map((action, i) => (
            <a key={i} href={action.link} className={`group bg-gradient-to-b from-[#0a0514] to-[#020202] border border-white/5 p-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${action.borderHover}`}>
              <div className="flex items-center gap-4">
                <div className={`text-2xl ${action.color}`}>{action.icon}</div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">{action.title}</span>
              </div>
              <FiArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* 5. FAQ SECTION & 6. MAP SECTION - Added background sweep */}
      <section className="w-full bg-gradient-to-b from-[#020202] via-[#080312] to-[#020202] border-y border-white/5 py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* FAQs */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 scale-y-110">Common Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-black/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-sm font-bold text-white pr-4">{faq.question}</span>
                    <FaChevronDown className={`text-purple-500 transition-transform duration-300 shrink-0 ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-sm text-purple-100/60 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 scale-y-110">Visit Our Office</h2>
            <div className="bg-gradient-to-br from-[#0a0514] to-black border border-white/10 p-2 rounded-[2rem] overflow-hidden h-[350px] relative group shadow-[0_0_40px_rgba(147,51,234,0.05)]">
              {/* Replaced with a valid embed URL for Karachi */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924234.6302710465!2d66.59495074892502!3d25.19338946981612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1716912345678!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[1.5rem]"
              ></iframe>
            </div>
            <p className="text-xs text-purple-300/50 uppercase tracking-widest font-bold mt-6 text-center">
              * In-person consultation available strictly by appointment only.
            </p>
          </div>

        </div>
      </section>

      {/* 7. SOCIAL LINKS SECTION */}
      <section className="py-16 text-center relative z-20">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Connect With Us Globally</h3>
        <div className="flex items-center justify-center gap-4">
          {[
            { icon: <FaWhatsapp />, link: "#", hover: "hover:text-green-500 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]" },
            { icon: <FaFacebookF />, link: "#", hover: "hover:text-blue-500 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]" },
            { icon: <FaInstagram />, link: "#", hover: "hover:text-pink-500 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]" },
            { icon: <FaLinkedinIn />, link: "#", hover: "hover:text-blue-400 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]" },
            { icon: <FaYoutube />, link: "#", hover: "hover:text-red-500 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]" }
          ].map((social, idx) => (
            <a 
              key={idx} 
              href={social.link} 
              className={`w-12 h-12 rounded-full bg-[#05020a] border border-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 text-lg ${social.hover}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}