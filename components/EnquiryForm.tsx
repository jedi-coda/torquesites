"use client";

import { useState } from "react";
import { premiumTheme } from "@/lib/fallbackGarage";

export default function EnquiryForm({
  garageName,
  toEmail,
  brandPrimary = premiumTheme.brandColor,
  garageSlug,
}: {
  garageName: string;
  toEmail: string;         // where you want the email to go
  brandPrimary?: string;   // used for button colour
  garageSlug?: string;     // to determine if we should use .btn classes
}) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.notes,
          slug: (typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "") || "",
          honeypot: (data as any).company || "",
        }),
      });
      setOk(res.ok);
      if (res.ok) form.reset();
    } catch {
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }

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
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Book Your <span style={{ color: premiumTheme.accentColor }}>Expert</span> Service
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to experience exceptional service? Get in touch with our expert team in Chesham.
          </p>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                <input 
                  name="name" 
                  required
                  className="w-full rounded-lg h-12 border border-gray-600 bg-gray-800/50 px-4 text-white placeholder:text-gray-400 transition-all duration-300" 
                  style={{
                    '--tw-ring-color': premiumTheme.accentColor,
                    '--tw-border-opacity': '1'
                  } as React.CSSProperties}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = premiumTheme.accentColor;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${premiumTheme.accentColor}40`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(75 85 99)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your full name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input 
                  name="phone" 
                  required
                  className="w-full rounded-lg h-12 border border-gray-600 bg-gray-800/50 px-4 text-white placeholder:text-gray-400 transition-all duration-300" 
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = premiumTheme.accentColor;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${premiumTheme.accentColor}40`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(75 85 99)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  placeholder="Your phone number" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input 
                name="email" 
                type="email"
                className="w-full rounded-lg h-12 border border-gray-600 bg-gray-800/50 px-4 text-white placeholder:text-gray-400 transition-all duration-300" 
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = premiumTheme.accentColor;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${premiumTheme.accentColor}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(75 85 99)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="your.email@example.com (optional)" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service Required</label>
              <select 
                name="service" 
                className="w-full rounded-lg h-12 border border-gray-600 bg-gray-800/50 px-4 text-white transition-all duration-300" 
                defaultValue="MOT"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = premiumTheme.accentColor;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${premiumTheme.accentColor}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(75 85 99)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="MOT">MOT Testing</option>
                <option value="Interim Service">Interim Service</option>
                <option value="Full Service">Full Service</option>
                <option value="Diagnostics">Advanced Diagnostics</option>
                <option value="Other">Other Service</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
              <textarea 
                name="notes" 
                className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white placeholder:text-gray-400 transition-all duration-300" 
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = premiumTheme.accentColor;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${premiumTheme.accentColor}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(75 85 99)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="Tell us about your vehicle or any specific requirements..." 
                rows={4} 
              />
            </div>
            
            {/* Honeypot */}
            <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: premiumTheme.accentColor }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  e.currentTarget.style.backgroundColor = premiumTheme.brandColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  e.currentTarget.style.backgroundColor = premiumTheme.accentColor;
                }
              }}
            >
              {submitting ? "Sending Your Enquiry..." : "Send Enquiry"}
            </button>
            
            {ok === true && (
              <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="text-green-400 text-sm font-medium">
                  ✅ Thanks! We'll be in touch within 24 hours.
                </div>
              </div>
            )}
            {ok === false && (
              <div className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="text-red-400 text-sm font-medium">
                  ❌ Sorry, something went wrong. Please call us directly or try again.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}