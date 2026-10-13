import React from "react";
import { profileData } from "../data/profile";
import { HeroArtwork } from "./HeroArtwork";
import { ArrowRight, Github, Compass, Sparkles, BookOpen } from "lucide-react";

interface HeroAboutProps {
  onExploreProjects: () => void;
  onOpenBookReader?: () => void;
}

export const HeroAbout: React.FC<HeroAboutProps> = ({
  onExploreProjects,
  onOpenBookReader
}) => {
  return (
    <section id="about" className="relative py-12 md:py-20 border-b border-[#20242B]/10 overflow-hidden">
      {/* Background Engineering Graph Accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker & Ledger Entry */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#20242B]/10 text-xs font-mono text-[#20242B]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#315CFF] font-semibold">ENTRY NO. 01</span>
            <span aria-hidden="true">/</span>
            <span>ACADEMIC YEAR 2026</span>
            <span aria-hidden="true">/</span>
            <span>DEPARTMENT OF ELECTRICAL & ELECTRONICS ENGINEERING</span>
          </div>
          <div className="flex items-center gap-2">
            <span>NIT WARANGAL</span>
            <span aria-hidden="true">·</span>
            <span>INDIA</span>
          </div>
        </div>

        {/* 2-Column Split Hero (Left: Typographic Narrative; Right: Technical Artwork) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column (7 cols): Identity, Headline, Bio, Motto, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Identity & Status Line */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF] tracking-wide uppercase">
                  <span>Student & Explorer</span>
                  <span aria-hidden="true">·</span>
                  <span>National Institute of Technology, Warangal</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#20242B] tracking-tight leading-[1.08] font-display">
                  {profileData.name}
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-[#20242B]/85 tracking-tight font-display">
                  "{profileData.headline}"
                </p>
              </div>

              {/* Verified Biography Copy */}
              <div className="space-y-4 text-base text-[#112A46] leading-relaxed font-serif max-w-2xl">
                {profileData.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-[15px] sm:text-base leading-relaxed text-[#112A46]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Prominent Motto Callout Banner */}
              <div className="relative p-5 sm:p-6 bg-[#FAF9F6] border-2 border-[#20242B] rounded-xs shadow-[3px_3px_0px_0px_#20242B] my-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono text-[11px] tracking-wider text-[#315CFF] font-semibold uppercase">
                    Personal Motto & Guiding Philosophy
                  </span>
                  <span className="font-mono text-[11px] text-[#112A46]/50">
                    RULE NO. 01
                  </span>
                </div>
                <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#112A46] font-medium leading-snug">
                  "{profileData.motto}"
                </blockquote>
                <div className="mt-3 pt-3 border-t border-[#20242B]/10 flex items-center justify-between text-xs text-[#112A46]/70 font-mono">
                  <span>CURIOUS · HANDS-ON · EXPERIMENTAL</span>
                  <span className="text-[#315CFF]">K. SURYA SHRAWAN</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#20242B] hover:bg-[#315CFF] transition-all rounded-xs shadow-xs cursor-pointer group"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {onOpenBookReader && (
                <button
                  type="button"
                  onClick={onOpenBookReader}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#20242B] bg-[#FAF9F6] hover:bg-[#E8E7E2]/50 border border-[#20242B]/30 hover:border-[#315CFF] transition-all rounded-xs cursor-pointer group"
                >
                  <BookOpen className="w-4 h-4 text-[#315CFF]" />
                  <span>Open Engineering Journal</span>
                </button>
              )}

              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-[#20242B]/80 hover:text-[#315CFF] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/ksuryashrawan1810-gif</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Technical Artwork / Laboratory Drafting Folio */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <HeroArtwork />
          </div>
        </div>

        {/* Full-width Context Bar Below Split (adheres to constitution layout rules) */}
        <div className="mt-14 pt-6 border-t border-[#20242B]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono text-[#112A46]/75">
          <div>
            <div className="text-[#112A46]/40 mb-1">AFFILIATION</div>
            <div className="font-semibold text-[#112A46] text-sm">NIT Warangal</div>
            <div className="text-[11px] text-[#112A46]/60">National Institute of Tech</div>
          </div>
          <div>
            <div className="text-[#112A46]/40 mb-1">BRANCH & STANDING</div>
            <div className="font-semibold text-[#112A46] text-sm">EEE · First Year</div>
            <div className="text-[11px] text-[#112A46]/60">Electrical & Electronics Eng.</div>
          </div>
          <div>
            <div className="text-[#112A46]/40 mb-1">CORE METHOD</div>
            <div className="font-semibold text-[#112A46] text-sm">Learn by Building</div>
            <div className="text-[11px] text-[#112A46]/60">Hands-on experimentation</div>
          </div>
          <div>
            <div className="text-[#112A46]/40 mb-1">DESIGN THEME</div>
            <div className="font-semibold text-[#112A46] text-sm">Curiosity, made tangible</div>
            <div className="text-[11px] text-[#112A46]/60">Engineering Journal Concept</div>
          </div>
        </div>
      </div>
    </section>
  );
};
