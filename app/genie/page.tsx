"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GeniePage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [vehicle, setVehicle] = useState("");

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
        I’m <span className="text-pink-500">MOTgenie</span>, your personal assistant 🚗
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-2xl">
        Let me take the stress out of car care. I’ll ask a couple of quick
        questions and match you with trusted garages near you.
      </p>

      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">First things first</h2>
              <p className="mb-6 text-gray-300">What do you need help with today?</p>
              <div className="grid gap-4">
                {["MOT", "Servicing", "Tyres", "Diagnostics"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setService(s);
                      next();
                    }}
                    className="bg-gray-700 hover:bg-pink-600 transition px-6 py-3 rounded-lg font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Got it ✅</h2>
              <p className="mb-6 text-gray-300">Where are you based?</p>
              <input
                type="text"
                placeholder="Enter postcode or town"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg text-black mb-6"
              />
              <div className="flex justify-between">
                <button onClick={back} className="text-gray-400">
                  ← Back
                </button>
                <button
                  onClick={next}
                  disabled={!location}
                  className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Almost done</h2>
              <p className="mb-6 text-gray-300">What vehicle are we looking after today?</p>
              <input
                type="text"
                placeholder="e.g. Ford Focus 2018"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full p-3 rounded-lg text-black mb-6"
              />
              <div className="flex justify-between">
                <button onClick={back} className="text-gray-400">
                  ← Back
                </button>
                <button
                  onClick={next}
                  disabled={!vehicle}
                  className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                >
                  Finish →
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-6">Perfect! 🎉</h2>
              <p className="text-gray-300 mb-6">
                You need <span className="font-semibold">{service}</span> in{" "}
                <span className="font-semibold">{location}</span> for your{" "}
                <span className="font-semibold">{vehicle}</span>.
              </p>
              <p className="mb-6">
                I’ll match you with trusted garages and exclusive rewards.
              </p>
              <button className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-lg font-semibold">
                Join the Waitlist 🚀
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}






