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

// Physical page-turning duration: 1150ms calibrated for authentic paper inertia
const PAGE_TURN_DURATION = 1150;

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

    // Complete animation at calibrated physical duration (1150ms)
    flipTimerRef.current = window.setTimeout(() => {
      setDisplaySection(targetSection);
      onSectionChange(targetSection);
      setIsFlipping(false);
      setRotationAngle(0);

      // Reset scroll position to top of new folio
      if (pageContainerRef.current) {
        pageContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
    }, PAGE_TURN_DURATION);
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

  return (
    <div className="relative w-full h-full flex-1 flex flex-col min-h-0 bg-[#FAF9F6] overflow-hidden">
      {/* 3D Page Viewport Stage */}
      <div className="relative flex-1 min-h-0 w-full flex overflow-hidden">
        {/* 3D Perspective Stage */}
        <div
          ref={pageContainerRef}
          className="relative flex-1 min-h-0 w-full bg-[#FAF9F6] overflow-y-auto overflow-x-hidden [perspective:2400px] [perspective-origin:50%_50%] scroll-smooth book-scroll-viewport"
          style={{
            transformStyle: "preserve-3d"
          }}
        >
            {/* Base Under-Page (Resting on book bed) */}
            <div
              className={`relative w-full h-full bg-[#FAF9F6] transition-opacity duration-500 ${
                isFlipping ? "pointer-events-none select-none" : ""
              }`}
            >
              {isFlipping
                ? getSectionContent(flipDirection === "forward" ? turningTo : turningFrom)
                : getSectionContent(displaySection)}

              {/* Realistic ambient drop shadow cast on bed as paper leaf lifts */}
              {isFlipping && (
                <div
                  className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-10 page-under-shadow"
                />
              )}
            </div>

            {/* 3D Turning Leaf (Active strictly during flip) */}
            {isFlipping && (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none z-40 turning-page-leaf"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotationAngle}deg)`,
                  transition: `transform ${PAGE_TURN_DURATION}ms cubic-bezier(0.35, 0.05, 0.22, 0.98)`,
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

                  {/* Dynamic Shading on Front Face during physical turn */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-black page-turn-shadow-front"
                  />

                  {/* Left Spine Crease Shadow & Paper Flex Lighting */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
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

                  {/* Dynamic Shading on Reverse Face during physical turn */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-black page-turn-shadow-back"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Folio Control Bar & Synchronized Page Indicator */}
        <div className="h-11 sm:h-12 bg-[#FAF9F6] border-t border-[#20242B]/10 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 shrink-0 select-none z-20">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={activeIndex === 0 || isFlipping}
            onClick={() => {
              if (activeIndex > 0) triggerPageTurn(SECTIONS[activeIndex - 1].id);
            }}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-mono border rounded-xs transition-colors cursor-pointer ${
              activeIndex === 0 || isFlipping
                ? "border-[#20242B]/10 text-[#112A46]/30 cursor-not-allowed"
                : "border-[#20242B]/20 text-[#112A46] hover:border-[#315CFF] hover:text-[#315CFF] bg-white shadow-xs"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Previous Folio</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Synchronized Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs font-mono text-[#112A46]">
            <span className="font-bold text-[#315CFF]">
              FOLIO 0{activeIndex + 1}
            </span>
            <span className="text-[#112A46]/30">/</span>
            <span className="text-[#112A46]/60">03</span>
            <span className="text-[#112A46]/80 font-semibold hidden md:inline">
              · {SECTIONS[activeIndex].title}
            </span>
            <span className="hidden xl:inline text-[11px] text-[#112A46]/40 ml-2">
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
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-mono border rounded-xs transition-colors cursor-pointer ${
              activeIndex === SECTIONS.length - 1 || isFlipping
                ? "border-[#20242B]/10 text-[#112A46]/30 cursor-not-allowed"
                : "border-[#20242B]/20 text-[#112A46] hover:border-[#315CFF] hover:text-[#315CFF] bg-white shadow-xs"
            }`}
          >
            <span className="hidden sm:inline">Next Folio</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    );
};
