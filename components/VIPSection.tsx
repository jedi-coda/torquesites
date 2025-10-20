"use client";
import { motion } from "framer-motion";

export default function VIPSection() {
  return (
    <section className="bg-gradient-to-b from-[#fff6d9] to-[#ffefb3] py-24 text-center">
      <div className="container mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-800 bg-yellow-200 rounded-full shadow-sm">
          🏁 <span>17 / 100 VIP slots claimed</span>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block w-2 h-2 bg-pink-500 rounded-full"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Exclusive VIP Access — Limited to the First 100 Garages
        </h2>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Save up to £500 on setup and 50% off monthly plans — lifetime pricing locked before public release.
        </p>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard VIP */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🥈 Standard VIP</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Perfect for smaller garages ready to get online fast. Includes responsive design,
                DVSA alignment, hosting, and SSL.
              </p>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">£499</div>
              <p className="text-sm text-gray-600 mb-2">(normally £999 setup)</p>
              <div className="text-xl font-semibold text-amber-600 mb-1">£49/month</div>
              <p className="text-sm text-gray-600 mb-6">(normally £99/month)</p>
            </div>
            <div>
              <button className="w-full py-3 mt-4 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 via-orange-400 to-amber-400 hover:opacity-90 transition">
                Secure Standard VIP Slot
              </button>
              <p className="text-xs text-gray-500 mt-2">
                *Includes full build and subscription plan. Cancel anytime after launch.
              </p>
            </div>
          </div>

          {/* Premium VIP */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🥇 Premium VIP</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                For established garages ready to elevate their brand. Includes full site customization,
                Stripe booking links, and VIP priority support.
              </p>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">£999</div>
              <p className="text-sm text-gray-600 mb-2">(normally £1,499 setup)</p>
              <div className="text-xl font-semibold text-amber-600 mb-1">£99/month</div>
              <p className="text-sm text-gray-600 mb-6">(normally £149/month)</p>
            </div>
            <div>
              <button className="w-full py-3 mt-4 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 via-orange-400 to-amber-400 hover:opacity-90 transition">
                Secure Premium VIP Slot
              </button>
              <p className="text-xs text-gray-500 mt-2">
                *Includes full build and subscription plan. Cancel anytime after launch.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-700 mt-10 text-sm">
          Only 100 VIP slots available across both plans. <br />
          Launch in 10 days or your money back. No contracts. No risk. Just results.
        </p>
      </div>
    </section>
  );
}
