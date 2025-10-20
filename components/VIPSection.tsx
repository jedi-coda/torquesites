"use client";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function VIPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#0E0E0E] py-24 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF6B00]/10 via-transparent to-[#C4FF00]/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C4FF00]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF9500] rounded-full shadow-lg border border-[#FF6B00]/30"
        >
          <span className="text-lg">🏁</span>
          <span>17 / 100 Performance Edition slots claimed</span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-[#C4FF00] rounded-full shadow-sm"
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
        >
          Exclusive Performance Edition
          <br />
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#C4FF00] bg-clip-text text-transparent">
            Limited to the First 100 Garages
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-[#D1D1D1] mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Save up to £500 on setup and 50% off monthly plans — lifetime performance pricing locked before public release. 
          <span className="text-[#C4FF00] font-semibold"> Engineered for speed. Built for results.</span>
        </motion.p>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Standard Performance */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group bg-[#1A1A1A] rounded-3xl shadow-xl p-8 border border-[#FF6B00]/20 flex flex-col justify-between hover:border-[#FF6B00]/40 hover:shadow-[0_0_30px_#FF6B00]/20 transition-all duration-500 relative overflow-hidden"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B00] to-[#FF9500] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  🥈
                </div>
                <h3 className="text-2xl font-bold text-white">Standard Performance</h3>
              </div>
              
              <p className="text-[#D1D1D1] mb-8 leading-relaxed text-left">
                Perfect for smaller garages ready to accelerate online. Includes responsive design,
                DVSA alignment, hosting, and SSL. <span className="text-[#C4FF00] font-semibold">Built for speed.</span>
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="text-4xl font-extrabold text-white">£499</div>
                <p className="text-sm text-[#D1D1D1]">(normally £999 setup)</p>
                <div className="text-2xl font-bold text-[#FF6B00]">£49/month</div>
                <p className="text-sm text-[#D1D1D1]">(normally £99/month)</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9500] hover:shadow-[0_0_20px_#FF6B00]/50 transition-all duration-300 border border-[#FF6B00]/30"
              >
                Join the Performance Edition
              </motion.button>
              <p className="text-xs text-[#D1D1D1] mt-3 text-center">
                *Includes full build and subscription plan. Cancel anytime after launch.
              </p>
            </div>
          </motion.div>

          {/* Premium Performance */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="group bg-[#1A1A1A] rounded-3xl shadow-xl p-8 border-2 border-[#FF6B00] flex flex-col justify-between hover:border-[#C4FF00] hover:shadow-[0_0_30px_#C4FF00]/20 transition-all duration-500 relative overflow-hidden"
          >
            {/* Premium Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-[#C4FF00] to-[#FF6B00] text-[#0E0E0E] px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                ⚡ MOST POPULAR
              </div>
            </div>

            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C4FF00]/5 to-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C4FF00] to-[#FF6B00] rounded-xl flex items-center justify-center text-[#0E0E0E] font-bold text-lg">
                  🥇
                </div>
                <h3 className="text-2xl font-bold text-white">Premium Performance</h3>
              </div>
              
              <p className="text-[#D1D1D1] mb-8 leading-relaxed text-left">
                For established garages ready to dominate their market. Includes full site customization,
                Stripe booking links, and VIP priority support. <span className="text-[#C4FF00] font-semibold">Built to dominate.</span>
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="text-4xl font-extrabold text-white">£999</div>
                <p className="text-sm text-[#D1D1D1]">(normally £1,499 setup)</p>
                <div className="text-2xl font-bold text-[#FF6B00]">£99/month</div>
                <p className="text-sm text-[#D1D1D1]">(normally £149/month)</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#C4FF00] to-[#FF6B00] hover:shadow-[0_0_20px_#C4FF00]/50 transition-all duration-300 border border-[#C4FF00]/30"
              >
                Join the Performance Edition
              </motion.button>
              <p className="text-xs text-[#D1D1D1] mt-3 text-center">
                *Includes full build and subscription plan. Cancel anytime after launch.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6B00]/20">
            <div className="text-3xl font-bold text-[#FF6B00] mb-2">10 Days</div>
            <div className="text-[#D1D1D1] text-sm">Average Launch Time</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#C4FF00]/20">
            <div className="text-3xl font-bold text-[#C4FF00] mb-2">99.9%</div>
            <div className="text-[#D1D1D1] text-sm">Uptime Guarantee</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6B00]/20">
            <div className="text-3xl font-bold text-[#FF6B00] mb-2">24/7</div>
            <div className="text-[#D1D1D1] text-sm">Performance Support</div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-[#D1D1D1] mt-12 text-sm max-w-2xl mx-auto leading-relaxed"
        >
          Only 100 Performance Edition slots available across both plans. 
          <br />
          <span className="text-[#C4FF00] font-semibold">Launch in 10 days or your money back.</span> 
          No contracts. No risk. Just performance.
        </motion.p>
      </div>
    </section>
  );
}