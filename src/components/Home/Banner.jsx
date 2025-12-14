import React, { useEffect, useState } from "react";
import Container from "../Shared/Container";

// Banner with left-side image and right-side text reveal animation.
// Animation runs only once per session (uses sessionStorage 'bannerSeen').
const Banner = () => {
  // initialize animation state from sessionStorage (avoid setState in effect)
  const [animate, setAnimate] = useState(() => {
    try {
      return !sessionStorage.getItem("bannerSeen");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!animate) return;
    try {
      sessionStorage.setItem("bannerSeen", "1");
    } catch {
      // ignore
    }
    const t = setTimeout(() => setAnimate(false), 1800);
    return () => clearTimeout(t);
  }, [animate]);
  const heroImage = "https://i.ibb.co.com/9m17TPPk/download-1-1.jpg";

  return (
    <section className="relative overflow-hidden bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}

          <div className="order-1 md:order-1">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <div className="text-xs font-medium uppercase tracking-wider">
                <p
                  className={`text-gray-600 mb-6 max-w-xl ${
                    animate ? "reveal-parent" : ""
                  }`}
                >
                  <span
                    className="reveal-line"
                    style={{ transitionDelay: "720ms" }}
                  >
                    AssetVerse helps teams track, secure and optimise both
                    physical and digital assets — all in one place.
                  </span>
                </p>

                {/* Info panel on the left text section (visible on md+) */}
                <div className="hidden md:block mb-6">
                  <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md w-full max-w-xl">
                    <div className="text-sm text-gray-600 mb-3">
                      Trusted by teams worldwide
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="text-center bg-blue-50 p-2 rounded-md">
                        <div className="text-lg font-bold text-blue-600">
                          120+
                        </div>
                        <div className="text-xs text-gray-600">
                          Assets Tracked
                        </div>
                      </div>
                      <div className="text-center bg-blue-50 p-2 rounded-md">
                        <div className="text-lg font-bold text-blue-600">
                          99.9%
                        </div>
                        <div className="text-xs text-gray-600">Uptime</div>
                      </div>
                      <div className="text-center bg-blue-50 p-2 rounded-md">
                        <div className="text-lg font-bold text-blue-600">
                          SOC2
                        </div>
                        <div className="text-xs text-gray-600">Compliant</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Secure, auditable and easy to use — built for teams.
                    </div>
                  </div>
                </div>

                <div
                  className={`flex gap-4 flex-col sm:flex-row ${
                    animate ? "reveal-parent" : ""
                  }`}
                >
                  <a
                    href="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                  >
                    Get Started Free
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}

          <div className="order-2 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Asset management dashboard preview"
                className="w-full h-72 sm:h-96 object-cover block"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Inline styles for reveal animation (keeps Tailwind config untouched) */}
      <style>{`\n        .reveal-line {\n          display: inline-block;\n          transform: translateY(18px);\n          opacity: 0;\n          transition: transform 450ms cubic-bezier(.2,.9,.2,1), opacity 400ms ease;\n        }\n        .reveal-parent .reveal-line {\n          transform: translateY(0);\n          opacity: 1;\n        }\n        /* gradient for emphasis */\n        .text-gradient {\n          background: linear-gradient(90deg,#0ea5e9 0%, #6366f1 100%);\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n        }\n      `}</style>
    </section>
  );
};

export default Banner;
