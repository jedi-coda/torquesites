"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function VIPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [startFirst, setStartFirst] = useState(false);
  const [startSecond, setStartSecond] = useState(false);
  
  // Uptime counter setup
  const uptimeRef = useRef(null);
  const isUptimeInView = useInView(uptimeRef, { once: false, amount: 0.5 });
  const uptimeValue = useMotionValue(0);
  const [uptimeDisplay, setUptimeDisplay] = useState("0.0");

  useEffect(() => {
    if (isInView) {
      const timer1 = setTimeout(() => setStartFirst(true), 500);
      return () => clearTimeout(timer1);
    }
  }, [isInView]);

  useEffect(() => {
    if (startFirst) {
      const timer2 = setTimeout(() => setStartSecond(true), 1500);
      return () => clearTimeout(timer2);
    }
  }, [startFirst]);
  
  // Animate uptime counter
  useEffect(() => {
    let controls: ReturnType<typeof animate> | undefined;

    if (isUptimeInView) {
      // Reset before re-animating
      uptimeValue.set(0);

      controls = animate(uptimeValue, 99.9, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setUptimeDisplay(v.toFixed(1)),
      });
    }

    return () => {
      if (controls) controls.stop();
    };
  }, [isUptimeInView]);

  return (
    <section ref={ref} className="py-16 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF6B00]/10 via-transparent to-[#C4FF00]/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C4FF00]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Performance Edition Slots Counter */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[#C4FF00] font-medium text-center mb-2"
        >
          🔥 17 / 100 Performance Edition slots already claimed
        </motion.p>
        
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
          Save up to £500 on setup and 50% off monthly plans — lifetime performance pricing locked before public release.<br />
          Launch in 7 days or your money back.<br />
          <span className="text-[#C4FF00] font-semibold">Engineered for speed. Built for results.</span>
        </motion.p>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Launch Ready */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group bg-[#1A1A1A] rounded-3xl shadow-xl p-8 border border-[#2D2D2D] flex flex-col justify-between hover:border-[#C4FF00] hover:shadow-[0_4px_15px_rgba(196,255,0,0.2)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Launch Ready</h3>
              <p className="text-sm italic text-[#FF6B00] mb-6">Built for speed — get your garage online fast.</p>
              
              <p className="text-[#D1D1D1] mb-8 leading-relaxed text-left">
                Perfect for independent garages ready to launch with impact.<br />
                Includes responsive design, DVSA alignment, hosting, and SSL.<br />
                Proven layout. Clear call-to-action. Go live in 7 days.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="text-4xl font-extrabold text-white">£499</div>
                <p className="text-sm text-[#D1D1D1]">setup · £49/month</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9500] hover:shadow-[0_0_20px_#FF6B00]/50 transition-all duration-300 border border-[#FF6B00]/30"
              >
                Start Your Engine →
              </motion.button>
              <p className="text-xs text-[#D1D1D1] mt-3 text-center">
                *Includes full build and subscription plan. Cancel anytime.
              </p>
            </div>
          </motion.div>

          {/* Supercharged */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="group bg-[#1A1A1A] rounded-3xl shadow-xl p-8 border-2 border-[#FF6B00] flex flex-col justify-between hover:border-[#FF6B00] hover:shadow-[0_4px_15px_rgba(255,107,0,0.3)] hover:-translate-y-1 transition-all duration-300 relative"
          >
            {/* Premium Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 -mt-4">
              <div className="bg-gradient-to-r from-[#C4FF00] to-[#FF6B00] text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Supercharged</h3>
              <p className="text-sm italic text-[#FF6B00] mb-6">Boost your bookings — engineered for conversion.</p>
              
              <p className="text-[#D1D1D1] mb-8 leading-relaxed text-left">
                For growing garages ready to dominate local search.<br />
                Includes full brand integration, Stripe payments, and VIP support.<br />
                Optimized for SEO, speed, and lead generation. Built to perform.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="text-4xl font-extrabold text-white">£999</div>
                <p className="text-sm text-[#D1D1D1]">setup · £99/month</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#C4FF00] to-[#FF6B00] hover:shadow-[0_0_20px_#C4FF00]/50 transition-all duration-300 border border-[#C4FF00]/30"
              >
                Shift Into Top Gear →
              </motion.button>
              <p className="text-xs text-[#D1D1D1] mt-3 text-center">
                *Includes full build and subscription plan. Cancel anytime.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t-[1px] border-[rgba(196,255,0,0.5)]"></div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-[#0E0E0E] rounded-2xl p-6 border border-[#FF6B00]/20">
            <div className="text-3xl font-bold text-[#FF6B00] mb-2" data-counter data-target="7">
              {startFirst ? <CountUp end={7} duration={1.5} suffix=" Days" /> : "0 Days"}
            </div>
            <div className="text-white text-sm">Average Launch Time</div>
          </div>
          <div className="bg-[#0E0E0E] rounded-2xl p-6 border border-[#C4FF00]/20">
            <span 
              ref={uptimeRef}
              className="text-3xl font-bold text-[#FF6B00] mb-2 block" 
              data-counter 
              data-target="99.9"
            >
              {uptimeDisplay}%
            </span>
            <div className="text-white text-sm">Uptime Guarantee</div>
          </div>
          <div className="bg-[#0E0E0E] rounded-2xl p-6 border border-[#FF6B00]/20">
            <div className="text-3xl font-bold text-[#FF6B00] mb-2" data-counter data-target="24">24/7</div>
            <div className="text-white text-sm">Performance Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
