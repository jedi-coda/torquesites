"use client";

import { useState } from "react";

type Props = {
  garageSlug?: string;
  garageName?: string;
};

export default function EnquiryForm({ garageSlug, garageName }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);

    // Validate required fields
    if (!formData.name.trim()) {
      setOk(false);
      setSubmitting(false);
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setOk(false);
      setSubmitting(false);
      return;
    }

    if (!formData.message.trim()) {
      setOk(false);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          garageSlug: garageSlug || "",
          garageName: garageName || ""
        }),
      });
      
      setOk(res.ok);
      if (res.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="py-16 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 border border-torque-orange/30 rounded-full mb-4 bg-torque-orange/20">
            <span className="text-sm font-medium tracking-wide text-torque-orange">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Book Your <span className="text-torque-orange">Expert</span> Service
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Ready to experience exceptional service? Get in touch with our expert team.
          </p>
        </div>
        
        <div className="bg-card-surface border border-neutral-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name *</label>
                <input 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl h-12 border border-zinc-600 bg-zinc-800 px-4 text-white placeholder:text-neutral-400 transition-all duration-300 focus:border-torque-orange focus:ring-2 focus:ring-torque-orange/20" 
                  placeholder="Enter your full name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Phone Number</label>
                <input 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  className="w-full rounded-xl h-12 border border-zinc-600 bg-zinc-800 px-4 text-white placeholder:text-neutral-400 transition-all duration-300 focus:border-torque-orange focus:ring-2 focus:ring-torque-orange/20" 
                  placeholder="Your phone number (optional)" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address *</label>
              <input 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                required
                className="w-full rounded-xl h-12 border border-zinc-600 bg-zinc-800 px-4 text-white placeholder:text-neutral-400 transition-all duration-300 focus:border-torque-orange focus:ring-2 focus:ring-torque-orange/20" 
                placeholder="your.email@example.com" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Message *</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-white placeholder:text-neutral-400 transition-all duration-300 focus:border-torque-orange focus:ring-2 focus:ring-torque-orange/20" 
                placeholder="Tell us about your vehicle or any specific requirements..." 
                rows={4} 
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 w-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send Enquiry"}
            </button>
            
            {ok === true && (
              <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="text-green-400 text-sm font-medium">
                  ✅ Thanks! We'll get back to you soon.
                </div>
              </div>
            )}
            {ok === false && (
              <div className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="text-red-400 text-sm font-medium">
                  ❌ Please check your details and try again.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}