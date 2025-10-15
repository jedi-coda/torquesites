"use client";

import { getSafeContact } from "@/lib/fallbackGarage";
import { premiumTheme } from "@/lib/fallbackGarage";

type Props = {
  phone?: string | null;
  email?: string | null;
};

// 🛠️ ContactDetails component with Newtown Garage branding and shared fallback logic
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ 100% safe rendering with null/undefined contact props
// ✅ Newtown Garage brand colors and styling
// ✅ Ready for 1000+ dynamic garage microsites

export default function ContactDetails({ phone, email }: Props) {
  const safePhone = phone || "01494 77 22 77";
  const safeEmail = email || "info@newtowngarage.com";

  return (
    <div className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div 
            className="inline-block px-4 py-2 border rounded-full mb-4"
            style={{ 
              backgroundColor: `${premiumTheme.accentColor}20`,
              borderColor: `${premiumTheme.accentColor}30`
            }}
          >
            <span 
              className="text-sm font-medium tracking-wide"
              style={{ color: premiumTheme.accentColor }}
            >
              CONTACT US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Get In <span style={{ color: premiumTheme.accentColor }}>Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to experience expert service? Contact our team in Chesham today.
          </p>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${premiumTheme.accentColor}20` }}
                >
                  <span 
                    className="text-xl"
                    style={{ color: premiumTheme.accentColor }}
                  >
                    📞
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Call Us</h3>
                  <a 
                    href={`tel:${safePhone}`}
                    className="transition-colors duration-300 text-lg font-medium"
                    style={{ color: premiumTheme.accentColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = premiumTheme.brandColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = premiumTheme.accentColor;
                    }}
                  >
                    {safePhone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${premiumTheme.accentColor}20` }}
                >
                  <span 
                    className="text-xl"
                    style={{ color: premiumTheme.accentColor }}
                  >
                    ✉️
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <a 
                    href={`mailto:${safeEmail}`}
                    className="transition-colors duration-300 text-lg font-medium"
                    style={{ color: premiumTheme.accentColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = premiumTheme.brandColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = premiumTheme.accentColor;
                    }}
                  >
                    {safeEmail}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <h3 className="text-white font-semibold mb-3">Opening Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span style={{ color: premiumTheme.accentColor }}>8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span style={{ color: premiumTheme.accentColor }}>8:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <h3 className="text-white font-semibold mb-3">Emergency Service</h3>
                <p className="text-gray-300 text-sm">
                  Available 24/7 for breakdown assistance and emergency repairs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}