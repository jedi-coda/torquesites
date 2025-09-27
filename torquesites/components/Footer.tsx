export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600 py-10">
      {/* Trust Strip */}
      <div className="flex justify-center gap-6 text-gray-700 mb-8 text-sm">
        <span>🔒 SSL Secured</span>
        <span>🇬🇧 UK Support</span>
        <span>⚡ Fast Hosting</span>
        <span>✅ No Hidden Fees</span>
      </div>

      {/* Footer Text */}
      <p className="text-gray-400 text-xs mb-4">
        Built for independent garages — everything you need to win bookings and
        look world-class online.
      </p>
      <p className="text-gray-400 text-xs">
        © {new Date().getFullYear()} <span className="font-semibold text-pink-600">TorqueSites</span>. All rights reserved.
      </p>
    </footer>
  );
}


