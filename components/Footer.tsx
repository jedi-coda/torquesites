// components/Footer.tsx
import { Lock, Headset, Zap, BadgeCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600 py-10">
      {/* Trust strip */}
      <div className="flex justify-center flex-wrap gap-6 text-gray-700 mb-8 text-sm">
        <span className="flex items-center gap-2">
          <Lock size={16} aria-hidden="true" /> SSL Secured
        </span>
        <span className="flex items-center gap-2">
          <Headset size={16} aria-hidden="true" /> UK Support
        </span>
        <span className="flex items-center gap-2">
          <Zap size={16} aria-hidden="true" /> Fast Hosting
        </span>
        <span className="flex items-center gap-2">
          <BadgeCheck size={16} aria-hidden="true" /> No Hidden Fees
        </span>
      </div>

      {/* Footer text */}
      <p className="text-gray-400 text-xs mb-4">
        Built for independent garages — everything you need to win bookings and look world-class online.
      </p>

      <p className="text-gray-400 text-xs">
        © {new Date().getFullYear()} <span className="font-semibold text-pink-600">TorqueSites</span>. All rights reserved.
      </p>
    </footer>
  );
}

