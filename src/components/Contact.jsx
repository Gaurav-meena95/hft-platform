import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const FloatingInput = ({ label, type = "text", name, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const InputTag = isTextArea ? "textarea" : "input";

  return (
    <div className="relative group w-full">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isFocused || value ? '-top-6 text-primary text-xs uppercase tracking-widest font-bold' : 'top-4 text-text-secondary text-base'
        }`}
      >
        {label}
      </label>
      <InputTag
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={isTextArea ? 4 : undefined}
        className="w-full bg-transparent border-b border-white/10 py-4 outline-none transition-all duration-300 focus:border-primary text-white text-lg"
      />
      <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 origin-left ${
        isFocused ? 'scale-x-100' : 'scale-x-0'
      }`} />
    </div>
  );
};

const Contact = () => {
  const infoItems = [
    { icon: Phone, text: "9312414710", label: "Phone" },
    { icon: Mail, text: "info@srhft.com", label: "Email" },
    { icon: MapPin, text: "L-48, Street No.17, New Mahavir Nagar, New Delhi", label: "Address" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-black relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            {"Get In Touch".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.3em] will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-text-secondary text-lg md:text-xl"
          >
            Ready to gain a competitive edge? Let's talk.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-6xl mx-auto">
          {/* Left Side Info */}
          <div className="flex-1 space-y-10 md:space-y-16">
            <div className="space-y-8 md:space-y-12">
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="flex items-start gap-6 group cursor-pointer will-change-transform"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,212,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                    <item.icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.25em] font-bold">{item.label}</p>
                    <p className="text-white text-base md:text-xl font-medium group-hover:text-primary transition-colors duration-300">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 will-change-transform"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700" />
              <p className="text-text-secondary leading-relaxed text-sm md:text-base relative z-10">
                Our support team is available 24/7 to assist you with any technical queries or solution integrations. Experience the future of trading infrastructure.
              </p>
            </motion.div>
          </div>

          {/* Right Side Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-[1.5] glass p-8 md:p-14 rounded-[2.5rem] border border-white/10 relative overflow-hidden will-change-transform"
          >
            <form className="space-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <FloatingInput label="Full Name" name="name" />
                <FloatingInput label="Email Address" type="email" name="email" />
              </div>
              <FloatingInput label="Phone Number" type="tel" name="phone" />
              <FloatingInput label="Message" name="message" isTextArea={true} />
              
              <button className="group relative w-full py-5 bg-primary text-black font-extrabold rounded-2xl hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all duration-500 transform hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest overflow-hidden">
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
