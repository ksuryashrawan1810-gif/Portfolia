import React from "react";
import { profileData } from "../data/profile";
import { Compass, Lightbulb, HeartHandshake, ShieldCheck } from "lucide-react";

export const PersonalPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 border-b border-[#20242B]/10 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-[#20242B]/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF]">
            <span>FOLIO SECTION 03</span>
            <span aria-hidden="true">·</span>
            <span>FIRST PRINCIPLES & MINDSET</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#20242B] font-display tracking-tight">
            Personal Philosophy & Approach
          </h2>
          <p className="text-base text-[#112A46]/85 leading-relaxed font-serif">
            How I approach engineering, unfamiliar technical terrain, and the responsibility of building tools that genuinely serve people.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileData.philosophyPillars.map((pillar) => (
            <div
              key={pillar.number}
              className="relative p-7 bg-[#FAF9F6] border border-[#20242B]/15 hover:border-[#20242B]/40 transition-all rounded-xs flex flex-col justify-between"
            >
              <div>
                {/* Clean editorial numbering */}
                <div className="flex items-baseline justify-between mb-4 border-b border-[#20242B]/10 pb-3">
                  <span className="font-mono text-xs font-bold text-[#315CFF]">
                    PILLAR {pillar.number}
                  </span>
                  <span className="font-mono text-xs text-[#112A46]/50">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#20242B] font-display mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#112A46]/85 leading-relaxed font-serif">
                  {pillar.reflection}
                </p>
              </div>

              {/* Bottom annotation mark */}
              <div className="mt-6 pt-3 border-t border-[#20242B]/10 flex items-center justify-between text-[11px] font-mono text-[#112A46]/50">
                <span>APPROACH · ACTIVE PRACTICE</span>
                <span>NITW / EEE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Thought / Editorial Blockquote */}
        <div className="mt-12 p-8 bg-[#E8E7E2]/30 border border-[#20242B]/20 rounded-xs flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs text-[#315CFF] font-semibold">
              THE BUILDER'S COMMITMENT
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#112A46] leading-snug">
              "For me, learning is not just about knowing how something works; it's about having the curiosity to try it, the patience to understand it, and the courage to create something with it."
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-display font-bold text-base text-[#20242B]">
              {profileData.name}
            </div>
            <div className="font-mono text-xs text-[#112A46]/70">
              {profileData.motto}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
