import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { type Garage } from '@/lib/garage';

interface FooterProps {
  garage?: Garage | null;
  tier: string;
}

export default function Footer({ garage, tier }: FooterProps) {
  const garageName = garage?.name || 'Garage';
  const logoPath = garage?.logoPath;
  
  // Social media URLs from garage data
  const socialLinks = {
    facebook: garage?.contact?.facebook,
    instagram: garage?.contact?.instagram,
    tiktok: garage?.contact?.tiktok,
  };

  return (
    <footer className="bg-gray-50 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            {logoPath ? (
              <Image
                src={logoPath}
                alt={`${garageName} logo`}
                width={120}
                height={40}
                className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
              />
            ) : (
              <div className="text-lg font-bold text-gray-800">
                {garageName}
              </div>
            )}
          </div>

          {/* Social Icons */}
          {(socialLinks.facebook || socialLinks.instagram || socialLinks.tiktok) && (
            <div className="flex items-center gap-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-200 hover:bg-blue-600 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-600 hover:text-white transition-colors duration-200" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-600 hover:text-white transition-colors duration-200" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-200 hover:bg-black transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-gray-600 hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Copyright - Centered */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm" style={{ color: '#ec008c' }}>
            © 2025 TorqueSites. All rights reserved.
          </p>
          <span className="text-xs mt-2 block text-center">
            {tier === 'hyper' && (
              <span className="text-orange-400 font-semibold">🚀 Hyper Mode • Powered by TorqueSites</span>
            )}
            {tier === 'supercharged' && (
              <span className="text-blue-400 font-semibold">💎 Supercharged Mode • Powered by TorqueSites</span>
            )}
            {(tier === 'turbo' || !tier) && (
              <span className="text-gray-400">⚙️ Turbo Mode • Powered by TorqueSites</span>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}