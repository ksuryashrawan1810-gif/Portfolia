import React, { useState, useEffect, useRef } from "react";
import { profileData } from "../../data/profile";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export type BookSection = "about" | "projects" | "contact";

interface PortfolioBookProps {
  currentSection: BookSection;
  onSectionChange: (section: BookSection) => void;
  renderAbout: () => React.ReactNode;
  renderProjects: () => React.ReactNode;
  renderContact: () => React.ReactNode;
}

const SECTIONS: { id: BookSection; title: string; folioCode: string; pageNum: number }[] = [
  { id: "about", title: "About & Philosophy", folioCode: "FOLIO 01", pageNum: 1 },
  { id: "projects", title: "Engineering Log & Projects", folioCode: "FOLIO 02", pageNum: 2 },
  { id: "contact", title: "Contact & Connect", folioCode: "FOLIO 03", pageNum: 3 }
];

export const PortfolioBook: React.FC<PortfolioBookProps> = ({
  currentSection,
  onSectionChange,
  renderAbout,
  renderProjects,
  renderContact
}) => {
  // Synchronized active displayed section
  const [displaySection, setDisplaySection] = useState<BookSection>(currentSection);

  // Animation state
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward">("forward");
  const [turningFrom, setTurningFrom] = useState<BookSection>(currentSection);
  const [turningTo, setTurningTo] = useState<BookSection>(currentSection);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // References
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const flipTimerRef = useRef<number | null>(null);

  // Detect user's reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current);
      }
    };
  }, []);

  // Watch for external currentSection changes (from top Navigation, Explore buttons, etc.)
  useEffect(() => {
    if (currentSection !== displaySection && !isFlipping) {
      triggerPageTurn(currentSection);
    }
  }, [currentSection]);

  // Execute 3D Page Turn
  const triggerPageTurn = (targetSection: BookSection) => {
    if (targetSection === displaySection || isFlipping) return;

    const targetIndex = SECTIONS.findIndex((s) => s.id === targetSection);
    const currentIndex = SECTIONS.findIndex((s) => s.id === displaySection);
    const direction = targetIndex > currentIndex ? "forward" : "backward";

    if (prefersReducedMotion) {
      setDisplaySection(targetSection);
      onSectionChange(targetSection);
      if (pageContainerRef.current) {
        pageContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
      return;
    }

    setIsFlipping(true);
    setFlipDirection(direction);
    setTurningFrom(displaySection);
    setTurningTo(targetSection);

    // Initial angle setup
    const startAngle = direction === "forward" ? 0 : -180;
    const endAngle = direction === "forward" ? -180 : 0;
    setRotationAngle(startAngle);

    // Two-step RAF ensures DOM reflow recognizes the starting angle before transitioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRotationAngle(endAngle);
      });
    });

    // Complete animation at 750ms
    flipTimerRef.current = window.setTimeout(() => {
      setDisplaySection(targetSection);
      onSectionChange(targetSection);
      setIsFlipping(false);
      setRotationAngle(0);

      // Reset scroll position to top of new folio
      if (pageContainerRef.current) {
        pageContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 750);
  };

  // Keyboard navigation for page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      const activeIdx = SECTIONS.findIndex((s) => s.id === displaySection);

      if (e.key === "ArrowRight") {
        if (activeIdx < SECTIONS.length - 1) {
          triggerPageTurn(SECTIONS[activeIdx + 1].id);
        }
      } else if (e.key === "ArrowLeft") {
        if (activeIdx > 0) {
          triggerPageTurn(SECTIONS[activeIdx - 1].id);
        }
      } else if (e.key === "1") {
        triggerPageTurn("about");
      } else if (e.key === "2") {
        triggerPageTurn("projects");
      } else if (e.key === "3") {
        triggerPageTurn("contact");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displaySection, isFlipping]);

  const activeIndex = SECTIONS.findIndex((s) => s.id === displaySection);

  // Helper to render section content by ID
  const getSectionContent = (sectionId: BookSection) => {
    switch (sectionId) {
      case "about":
        return renderAbout();
      case "projects":
        return renderProjects();
      case "contact":
        return renderContact();
      default:
        return null;
    }
  };

  // Dynamic shadow calculation
  const normalizedProgress = Math.abs(rotationAngle) / 180;
  const shadowOpacity = Math.sin(normalizedProgress * Math.PI) * 0.4;

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
      {/* Physical Engineering Notebook Shell */}
      <div className="relative bg-[#FAF9F6] border-2 border-[#20242B] rounded-xs shadow-[6px_6px_0px_0px_#20242B] sm:shadow-[10px_10px_0px_0px_#20242B] overflow-hidden flex flex-col">
        {/* Top Folio Header & Notebook Index Tabs */}
        <div className="h-14 bg-[#FAF9F6] border-b-2 border-[#20242B] px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 shrink-0 select-none z-20">
          {/* Left: Binding mark & active folio code */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#20242B]">
              <span className="w-2.5 h-2.5 bg-[#315CFF]" />
              <span className="tracking-wider uppercase text-[11px] sm:text-xs">
                NITW · EEE JOURNAL
              </span>
            </div>
            <span className="text-[#20242B]/30 hidden sm:inline" aria-hidden="true">/</span>
            <span className="text-xs font-mono text-[#315CFF] font-semibold hidden sm:inline">
              {SECTIONS[activeIndex].folioCode}
            </span>
          </div>

          {/* Center/Right: Bookmark Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {SECTIONS.map((sec, idx) => {
              const isActive = displaySection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  disabled={isFlipping}
                  onClick={() => triggerPageTurn(sec.id)}
                  className={`px-2 sm:px-3 py-1.5 text-xs font-mono transition-all rounded-xs cursor-pointer border flex items-center gap-1 ${
                    isActive
                      ? "bg-[#20242B] text-[#FAF9F6] border-[#20242B] font-bold shadow-xs"
                      : "bg-[#FAF9F6] text-[#20242B]/75 border-[#20242B]/20 hover:border-[#315CFF] hover:text-[#315CFF]"
                  } ${isFlipping ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <span className="text-[10px] text-[#C6E86B] font-bold">0{idx + 1}</span>
                  <span className="capitalize">{sec.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Book Spine Details & 3D Page Viewport */}
        <div className="relative flex-1 flex overflow-hidden min-h-[750px]">
          {/* Left Physical Notebook Binding Edge (Desktop Spine) */}
          <div className="hidden md:flex w-12 bg-[#E8E7E2] border-r-2 border-[#20242B] shrink-0 flex-col items-center justify-between py-6 select-none z-30">
            {/* Top rivets */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border-2 border-[#20242B] bg-[#FAF9F6]" />
              <div className="w-px h-8 bg-[#20242B]/30" />
              <div className="w-3 h-3 rounded-full border-2 border-[#20242B] bg-[#FAF9F6]" />
            </div>

            {/* Rotated spine text */}
            <div className="rotate-180 [writing-mode:vertical-rl] font-mono text-[10px] tracking-widest text-[#20242B]/60 uppercase">
              WARANGAL EEE FOLIO 2026
            </div>

            {/* Bottom rivets */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border-2 border-[#20242B] bg-[#FAF9F6]" />
              <div className="w-px h-8 bg-[#20242B]/30" />
              <div className="w-3 h-3 rounded-full border-2 border-[#20242B] bg-[#FAF9F6]" />
            </div>
          </div>

          {/* 3D Perspective Stage */}
          <div
            ref={pageContainerRef}
            className="relative flex-1 bg-[#FAF9F6] overflow-y-auto overflow-x-hidden [perspective:2400px] [perspective-origin:15%_50%]"
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {/* Base Under-Page (Resting on book bed) */}
            <div
              className={`w-full h-full bg-[#FAF9F6] transition-opacity duration-300 ${
                isFlipping ? "pointer-events-none select-none" : ""
              }`}
            >
              {isFlipping
                ? getSectionContent(flipDirection === "forward" ? turningTo : turningTo)
                : getSectionContent(displaySection)}
            </div>

            {/* 3D Turning Leaf (Active strictly during flip) */}
            {isFlipping && (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none z-40"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotationAngle}deg)`,
                  transition: "transform 750ms cubic-bezier(0.25, 1, 0.45, 1)",
                  willChange: "transform"
                }}
              >
                {/* Front Face of Turning Leaf */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#FAF9F6] overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                >
                  <div className="w-full h-full opacity-95 pointer-events-none">
                    {flipDirection === "forward"
                      ? getSectionContent(turningFrom)
                      : getSectionContent(turningTo)}
                  </div>

                  {/* Dynamic Shading on Front Face */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      backgroundColor: "black",
                      opacity: shadowOpacity
                    }}
                  />

                  {/* Left Spine Crease Shadow */}
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Back Face of Turning Leaf (Verso Page) */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#FAF9F6] border-r-2 border-[#20242B]/20 p-6 sm:p-12 overflow-hidden flex flex-col justify-between"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                >
                  {/* Engineering Grid on Verso Paper */}
                  <div className="absolute inset-0 engineering-grid opacity-75 pointer-events-none" />

                  {/* Verso Header Stamp */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[#20242B]/15 pb-4 text-xs font-mono text-[#20242B]/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#C6E86B] border border-[#20242B]" />
                      <span className="font-bold text-[#20242B]">
                        FOLIO VERSO · NOTEBOOK PAGE #{SECTIONS[activeIndex].pageNum}B
                      </span>
                    </div>
                    <span>NIT WARANGAL · EEE LAB</span>
                  </div>

                  {/* Verso Center Marginalia */}
                  <div className="relative z-10 max-w-xl mx-auto text-center space-y-4 my-auto px-4">
                    <span className="font-mono text-xs text-[#315CFF] tracking-wider uppercase block">
                      LABORATORY MARGINALIA & OBSERVATIONS
                    </span>
                    <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#112A46] leading-snug">
                      "{profileData.motto}"
                    </blockquote>
                    <p className="text-xs font-mono text-[#112A46]/70">
                      TURNING PAGE TO {SECTIONS.find((s) => s.id === turningTo)?.folioCode} · {SECTIONS.find((s) => s.id === turningTo)?.title.toUpperCase()}
                    </p>
                  </div>

                  {/* Verso Footer */}
                  <div className="relative z-10 pt-4 border-t border-[#20242B]/15 flex items-center justify-between text-[11px] font-mono text-[#112A46]/50">
                    <span>K. SURYA SHRAWAN</span>
                    <span>NATIONAL INSTITUTE OF TECHNOLOGY, WARANGAL</span>
                  </div>

                  {/* Dynamic Shading on Reverse Face */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      backgroundColor: "black",
                      opacity: shadowOpacity * 0.7
                    }}
                  />
                </div>
              </div>
            )}

            {/* Left Spine Ambient Drop Shadow */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* Bottom Folio Control Bar & Synchronized Page Indicator */}
        <div className="h-14 bg-[#FAF9F6] border-t-2 border-[#20242B] px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 shrink-0 select-none z-20">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={activeIndex === 0 || isFlipping}
            onClick={() => {
              if (activeIndex > 0) triggerPageTurn(SECTIONS[activeIndex - 1].id);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded-xs transition-colors cursor-pointer ${
              activeIndex === 0 || isFlipping
                ? "border-[#20242B]/15 text-[#112A46]/30 cursor-not-allowed"
                : "border-[#20242B]/30 text-[#112A46] hover:border-[#315CFF] hover:text-[#315CFF] bg-white shadow-xs"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Folio</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Synchronized Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-[#112A46]">
            <span className="font-bold text-[#315CFF]">
              FOLIO 0{activeIndex + 1}
            </span>
            <span className="text-[#112A46]/30">/</span>
            <span className="text-[#112A46]/60">03</span>
            <span className="text-[#112A46]/80 font-semibold hidden md:inline">
              · {SECTIONS[activeIndex].title}
            </span>
            <span className="hidden lg:inline text-[11px] text-[#112A46]/40 ml-2">
              (Keys: <kbd className="px-1 py-0.5 border border-[#112A46]/20 rounded-xs bg-white">←</kbd> / <kbd className="px-1 py-0.5 border border-[#112A46]/20 rounded-xs bg-white">→</kbd> or <kbd className="px-1 py-0.5 border border-[#112A46]/20 rounded-xs bg-white">1</kbd>, <kbd className="px-1 py-0.5 border border-[#112A46]/20 rounded-xs bg-white">2</kbd>, <kbd className="px-1 py-0.5 border border-[#112A46]/20 rounded-xs bg-white">3</kbd>)
            </span>
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            disabled={activeIndex === SECTIONS.length - 1 || isFlipping}
            onClick={() => {
              if (activeIndex < SECTIONS.length - 1) triggerPageTurn(SECTIONS[activeIndex + 1].id);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded-xs transition-colors cursor-pointer ${
              activeIndex === SECTIONS.length - 1 || isFlipping
                ? "border-[#20242B]/15 text-[#112A46]/30 cursor-not-allowed"
                : "border-[#20242B]/30 text-[#112A46] hover:border-[#315CFF] hover:text-[#315CFF] bg-white shadow-xs"
            }`}
          >
            <span className="hidden sm:inline">Next Folio</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
