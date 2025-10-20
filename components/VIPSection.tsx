"use client";
import { motion } from "framer-motion";

export default function VIPSection() {
  return (
    <section className="bg-gradient-to-b from-[#FF6B00]/10 to-[#FF9500]/10 py-24 text-center">
      <div className="container mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-white bg-gradient-to-r from-[#FF6B00] to-[#FF9500] rounded-full shadow-lg">
          🏁 <span>17 / 100 Performance Edition slots claimed</span>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block w-2 h-2 bg-[#C4FF00] rounded-full"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Exclusive Performance Edition — Limited to the First 100 Garages
        </h2>
        <p className="text-lg text-[#D1D1D1] mb-10 max-w-2xl mx-auto">
          Save up to £500 on setup and 50% off monthly plans — lifetime performance pricing locked before public release.
        </p>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard VIP */}
          <div className="bg-[#1A1A1A] rounded-2xl shadow-lg p-8 border border-[#FF6B00]/20 flex flex-col justify-between hover:shadow-[0_0_15px_#FF6B00]/20 transition-all duration-300">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">🥈 Standard Performance</h3>
              <p className="text-[#D1D1D1] mb-6 leading-relaxed">
                Perfect for smaller garages ready to accelerate online. Includes responsive design,
                DVSA alignment, hosting, and SSL.
              </p>
              <div className="text-4xl font-extrabold text-white mb-1">£499</div>
              <p className="text-sm text-[#D1D1D1] mb-2">(normally £999 setup)</p>
              <div className="text-xl font-semibold text-[#FF6B00] mb-1">£49/month</div>
              <p className="text-sm text-[#D1D1D1] mb-6">(normally £99/month)</p>
            </div>
            <div>
              <button className="w-full py-3 mt-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#FF6B00] to-[#FF9500] hover:shadow-[0_0_15px_#FF6B00]/50 transition-all duration-200">
                Join the Performance Edition
              </button>
              <p className="text-xs text-[#D1D1D1] mt-2">
                *Includes full build and subscription plan. Cancel anytime after launch.
              </p>
            </div>
          </div>

          {/* Premium VIP */}
          <div className="bg-[#1A1A1A] rounded-2xl shadow-lg p-8 border border-[#FF6B00]/20 flex flex-col justify-between hover:shadow-[0_0_15px_#FF6B00]/20 transition-all duration-300">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">🥇 Premium Performance</h3>
              <p className="text-[#D1D1D1] mb-6 leading-relaxed">
                For established garages ready to dominate their market. Includes full site customization,
                Stripe booking links, and VIP priority support.
              </p>
              <div className="text-4xl font-extrabold text-white mb-1">£999</div>
              <p className="text-sm text-[#D1D1D1] mb-2">(normally £1,499 setup)</p>
              <div className="text-xl font-semibold text-[#FF6B00] mb-1">£99/month</div>
              <p className="text-sm text-[#D1D1D1] mb-6">(normally £149/month)</p>
            </div>
            <div>
              <button className="w-full py-3 mt-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#FF6B00] to-[#FF9500] hover:shadow-[0_0_15px_#FF6B00]/50 transition-all duration-200">
                Join the Performance Edition
              </button>
              <p className="text-xs text-[#D1D1D1] mt-2">
                *Includes full build and subscription plan. Cancel anytime after launch.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[#D1D1D1] mt-10 text-sm">
          Only 100 Performance Edition slots available across both plans. <br />
          Launch in 10 days or your money back. No contracts. No risk. Just performance.
        </p>
      </div>
    </section>
  );
}
