import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const FloatingInput = ({ label, type = "text", name, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const InputTag = isTextArea ? "textarea" : "input";

  return (
    <div className="relative group">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isFocused || value ? '-top-6 text-primary text-sm' : 'top-4 text-text-secondary'
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
        className="w-full bg-transparent border-b border-white/10 py-4 outline-none transition-all duration-300 focus:border-primary text-white"
      />
      <div className={`absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-500 ${
        isFocused ? 'w-full' : 'w-0'
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
    <section id="contact" className="py-32 bg-black relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            {"Get In Touch".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-text-secondary text-xl"
          >
            Ready to gain a competitive edge? Let's talk.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 max-w-6xl mx-auto">
          {/* Left Side Info */}
          <div className="flex-1 space-y-12">
            <div className="space-y-8">
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-white text-lg font-medium group-hover:text-primary transition-colors">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none" />
              <p className="text-text-secondary leading-relaxed">
                Our support team is available 24/7 to assist you with any technical queries or solution integrations.
              </p>
            </div>
          </div>

          {/* Right Side Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-[1.5] glass p-10 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden"
          >
            <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FloatingInput label="Full Name" name="name" />
                <FloatingInput label="Email Address" type="email" name="email" />
              </div>
              <FloatingInput label="Phone Number" type="tel" name="phone" />
              <FloatingInput label="Message" name="message" isTextArea={true} />
              
              <button className="w-full py-5 bg-primary text-black font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
