import React, { useState } from "react";
import { profileData, AreaOfInterest } from "../data/profile";
import { Cpu, Bot, Wrench, Lightbulb, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const getInterestIcon = (id: string) => {
  switch (id) {
    case "ai-ml":
      return <Sparkles className="w-5 h-5 text-[#315CFF]" />;
    case "hardware-electronics":
      return <Cpu className="w-5 h-5 text-[#315CFF]" />;
    case "automation-agents":
      return <Bot className="w-5 h-5 text-[#315CFF]" />;
    case "experimentation-prototyping":
      return <Wrench className="w-5 h-5 text-[#315CFF]" />;
    case "tech-business":
      return <TrendingUp className="w-5 h-5 text-[#315CFF]" />;
    default:
      return <Lightbulb className="w-5 h-5 text-[#315CFF]" />;
  }
};

export const AreasOfInterest: React.FC = () => {
  const [activeInterestId, setActiveInterestId] = useState<string>(
    profileData.areasOfInterest[0].id
  );

  const selectedInterest = profileData.areasOfInterest.find(
    (item) => item.id === activeInterestId
  ) || profileData.areasOfInterest[0];

  return (
    <section id="interests" className="py-8 sm:py-12 md:py-16 border-b border-[#20242B]/10 bg-[#FAF9F6]">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#20242B]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF]">
              <span>FOLIO SECTION 02</span>
              <span aria-hidden="true">·</span>
              <span>CURRICULAR & INDEPENDENT INQUIRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#20242B] font-display tracking-tight">
              Areas of Active Interest
            </h2>
          </div>
          <div className="max-w-md text-xs font-mono text-[#20242B]/60 leading-relaxed">
            * Clarification: These represent current topics of self-directed study, curiosity, and experimentation, not finalized expert achievements.
          </div>
        </div>

        {/* 5 Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.areasOfInterest.map((interest, idx) => {
            const isSelected = interest.id === activeInterestId;
            return (
              <div
                key={interest.id}
                onClick={() => setActiveInterestId(interest.id)}
                className={`group relative p-6 bg-[#FAF9F6] border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#315CFF] shadow-[2px_2px_0px_0px_#315CFF]"
                    : "border-[#20242B]/15 hover:border-[#20242B]/40 hover:shadow-xs"
                }`}
              >
                <div>
                  {/* Top metadata index */}
                  <div className="flex items-center justify-between mb-4 text-xs font-mono text-[#112A46]/50">
                    <span className="font-semibold text-[#112A46]/70">
                      INDEX 0{idx + 1}
                    </span>
                    <span className="text-[#315CFF]">{interest.shortTag}</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 border border-[#20242B]/10 bg-[#FAF9F6] shrink-0">
                      {getInterestIcon(interest.id)}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#20242B] leading-snug group-hover:text-[#315CFF] transition-colors">
                      {interest.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#112A46]/85 leading-relaxed font-serif mb-4">
                    {interest.description}
                  </p>

                  {/* Curiosity Notes (Engineering Journal Margin) */}
                  <div className="p-3 bg-[#E8E7E2]/30 border border-[#20242B]/10 rounded-xs mb-4 text-xs text-[#112A46]/90">
                    <span className="font-mono text-[10px] text-[#315CFF] font-semibold block mb-1">
                      CURRENT INVESTIGATION:
                    </span>
                    <p className="italic font-serif leading-relaxed text-[#112A46]">
                      "{interest.curiosityNotes}"
                    </p>
                  </div>
                </div>

                {/* Focus Topics - Rendered cleanly without pills per design constitution */}
                <div className="pt-3 border-t border-[#20242B]/10 mt-auto">
                  <div className="text-[11px] font-mono text-[#112A46]/50 mb-1.5 uppercase">
                    Topics of study:
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#112A46]/80 font-mono">
                    {interest.focusTopics.map((topic, tIdx) => (
                      <React.Fragment key={topic}>
                        <span className="hover:text-[#315CFF] transition-colors">{topic}</span>
                        {tIdx < interest.focusTopics.length - 1 && (
                          <span className="text-[#112A46]/30" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Cross-Discipline Synthesis / Engineering Mindset */}
          <div className="p-6 bg-[#20242B] text-[#FAF9F6] flex flex-col justify-between rounded-xs">
            <div>
              <div className="flex items-center justify-between mb-4 text-xs font-mono text-[#FAF9F6]/50">
                <span className="text-[#C6E86B] font-semibold">SYNTHESIS</span>
                <span>NITW / EEE</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-3">
                The Intersection is the Goal
              </h3>
              <p className="text-sm text-[#FAF9F6]/80 leading-relaxed mb-4">
                "I don't want to limit myself to just one field. Whether it's wiring sensors or exploring neural weights, the most interesting problems live where hardware meets intelligence and business creates utility."
              </p>
            </div>
            <div className="pt-4 border-t border-[#FAF9F6]/10 text-xs font-mono text-[#C6E86B]">
              <span>K. Surya Shrawan · First-Year EEE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
