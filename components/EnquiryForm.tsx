"use client";

import { useState, useRef } from "react";
import { premiumTheme } from "@/lib/fallbackGarage";

export default function EnquiryForm({
}: {
  garageName: string;
  toEmail: string;         // where you want the email to go
  brandPrimary?: string;   // used for button colour
  garageSlug?: string;     // to determine if we should use .btn classes
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    // ✅ Validate browser-native fields
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);

      const res = await fetch("/api/book-demo", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/success";
      } else {
        console.error("Submission failed");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        <div id="enquiry" className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm scroll-mt-24">
          <form ref={formRef} noValidate className="space-y-6" onSubmit={handleSubmit}>
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
                  type="tel"
                  required
                  pattern="[0-9\s]{10,15}"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
              <input 
                name="email" 
                type="email"
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
                placeholder="your.email@example.com" 
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
              disabled={isSubmitting}
              className="w-full text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: premiumTheme.accentColor }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = premiumTheme.brandColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = premiumTheme.accentColor;
                }
              }}
            >
              {isSubmitting ? "Submitting..." : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}