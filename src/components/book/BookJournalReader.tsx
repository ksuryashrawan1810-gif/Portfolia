import React, { useState, useEffect } from "react";
import { profileData } from "../../data/profile";
import { projectsData } from "../../data/projects";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, Maximize2, Minimize2, X, Compass, Cpu, Sparkles } from "lucide-react";

interface BookJournalReaderProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

interface JournalPage {
  pageNumber: number;
  chapterTitle: string;
  sectionCode: string;
  type: "cover" | "about" | "philosophy" | "interests" | "project";
  contentTitle: string;
  body: React.ReactNode;
}

export const BookJournalReader: React.FC<BookJournalReaderProps> = ({
  isOpen,
  onClose,
  initialPage = 1
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    if (initialPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  // Keyboard navigation for page turning
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  // Build Pages Content
  const pages: JournalPage[] = [
    // Page 1: Title & Motto Folio
    {
      pageNumber: 1,
      chapterTitle: "PROLOGUE & FOUNDATION",
      sectionCode: "FOLIO-01",
      type: "cover",
      contentTitle: "Curiosity, Made Tangible",
      body: (
        <div className="space-y-6 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-mono text-[#315CFF] tracking-widest uppercase mb-2">
              National Institute of Technology, Warangal · EEE
            </div>
            <h1 className="text-3xl font-display font-bold text-[#20242B] tracking-tight">
              {profileData.name}
            </h1>
            <p className="text-base font-semibold text-[#20242B]/80 font-display mt-1">
              "{profileData.headline}"
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F6] border-2 border-[#20242B] rounded-xs shadow-[3px_3px_0px_0px_#20242B] my-4">
            <span className="font-mono text-[10px] text-[#315CFF] font-bold block mb-2 uppercase">
              Core Personal Motto
            </span>
            <blockquote className="font-serif italic text-2xl text-[#112A46] leading-snug">
              "{profileData.motto}"
            </blockquote>
          </div>

          <div className="text-xs text-[#112A46]/85 leading-relaxed font-sans">
            This digital journal records continuous hands-on explorations at the intersection of electrical engineering, artificial intelligence, and purposeful prototyping.
          </div>
        </div>
      )
    },

    // Page 2: About Biography
    {
      pageNumber: 2,
      chapterTitle: "STUDENT PROFILE",
      sectionCode: "FOLIO-02",
      type: "about",
      contentTitle: "About the Builder",
      body: (
        <div className="space-y-4 text-sm text-[#112A46]/85 leading-relaxed font-sans">
          {profileData.bioParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className="pt-3 border-t border-[#20242B]/10 text-xs font-mono text-[#112A46]/60">
            <div>COLLEGE: {profileData.college}</div>
            <div>BRANCH: {profileData.branchFull} ({profileData.year})</div>
          </div>
        </div>
      )
    },

    // Page 3: Personal Philosophy
    {
      pageNumber: 3,
      chapterTitle: "FIRST PRINCIPLES",
      sectionCode: "FOLIO-03",
      type: "philosophy",
      contentTitle: "Guiding Principles",
      body: (
        <div className="space-y-4">
          <p className="text-xs text-[#112A46]/70 font-sans italic">
            Four guiding rules that frame how I confront complex engineering challenges:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {profileData.philosophyPillars.map((p) => (
              <div key={p.number} className="p-3 bg-[#E8E7E2]/30 border border-[#20242B]/10 rounded-xs">
                <div className="flex items-center justify-between text-xs font-mono text-[#315CFF] mb-1">
                  <span className="font-bold">{p.number}. {p.title}</span>
                  <span className="text-[#112A46]/50">{p.subtitle}</span>
                </div>
                <p className="text-xs text-[#112A46]/85 font-sans leading-relaxed">
                  {p.reflection}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Page 4: Areas of Inquiry
    {
      pageNumber: 4,
      chapterTitle: "AREAS OF INTEREST",
      sectionCode: "FOLIO-04",
      type: "interests",
      contentTitle: "Fields Under Exploration",
      body: (
        <div className="space-y-3">
          <p className="text-xs font-mono text-[#20242B]/60">
            * Self-directed learning tracks, actively investigated through projects:
          </p>
          {profileData.areasOfInterest.map((interest) => (
            <div key={interest.id} className="p-3 border border-[#20242B]/10 rounded-xs">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="font-bold text-[#20242B]">{interest.title}</span>
                <span className="text-[#315CFF]">{interest.shortTag}</span>
              </div>
              <p className="text-xs text-[#20242B]/80 font-sans leading-relaxed mb-1.5">
                {interest.description}
              </p>
              <div className="text-[11px] font-mono text-[#20242B]/50">
                {interest.focusTopics.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Pages 5+: Real GitHub Project Explorations
    ...projectsData.map((project, idx) => ({
      pageNumber: 5 + idx,
      chapterTitle: `PROJECT FOLIO · ${project.categoryId.toUpperCase()}`,
      sectionCode: `LOG-0${idx + 1}`,
      type: "project" as const,
      contentTitle: project.title,
      body: (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#112A46]/60 pb-2 border-b border-[#20242B]/10">
            <span className="text-[#315CFF] font-semibold">PROJECT {project.folioNumber}</span>
            <span>GITHUB REPO</span>
          </div>

          <p className="text-sm text-[#112A46]/85 font-serif leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="p-3 bg-[#E8E7E2]/40 border border-[#20242B]/15 rounded-xs">
            <span className="font-mono text-[10px] text-[#315CFF] font-bold block mb-1">
              PIPELINE WORKFLOW:
            </span>
            <ul className="space-y-1 text-xs text-[#112A46]/80 font-serif">
              {project.workflow.slice(0, 3).map((w, wIdx) => (
                <li key={wIdx} className="flex items-start gap-1.5">
                  <span className="text-[#315CFF] font-mono">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.results && (
            <div className="text-xs font-mono text-[#112A46]/80 p-2.5 bg-white border border-[#20242B]/10 rounded-xs">
              <span className="text-[#315CFF] font-semibold">REPORTED STATUS: </span>
              <span>{project.results.bestModel || project.results.reportedAccuracy}</span>
            </div>
          )}

          <div className="pt-2 text-xs font-mono text-[#112A46]/60">
            Stack: {project.technologies.join(" · ")}
          </div>
        </div>
      )
    }))
  ];

  const totalPages = pages.length;
  const activePageData = pages[currentPage - 1] || pages[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#20242B]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      {/* Book Container with Editorial Journal Styling */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border-2 border-[#20242B] rounded-xs shadow-2xl flex flex-col h-[90vh] max-h-[800px] overflow-hidden">
        {/* Top Book Bar / Bookmark Tabs */}
        <div className="h-12 border-b border-[#20242B]/15 bg-[#FAF9F6] px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-[#315CFF]" />
            <span className="font-mono text-xs font-bold text-[#20242B] tracking-wider uppercase">
              ENGINEERING JOURNAL · NITW FOLIO
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#20242B]/70 tabular-nums">
              PAGE {currentPage.toString().padStart(2, "0")} OF {totalPages.toString().padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#20242B] hover:text-[#315CFF] border border-[#20242B]/20 rounded-xs cursor-pointer ml-2"
              aria-label="Close book view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Book Page Content (Journal Spread Aesthetic) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 relative">
          {/* Subtle paper engineering grid */}
          <div className="absolute inset-0 engineering-grid opacity-35 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto h-full flex flex-col justify-between">
            {/* Page Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#20242B]/50 pb-3 mb-6 border-b border-[#20242B]/10">
                <span className="text-[#315CFF] font-semibold">{activePageData.chapterTitle}</span>
                <span>{activePageData.sectionCode}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#20242B] mb-6">
                {activePageData.contentTitle}
              </h2>

              {/* Main Page Body */}
              <div className="py-2">
                {activePageData.body}
              </div>
            </div>

            {/* Page Footer */}
            <div className="pt-6 mt-8 border-t border-[#20242B]/10 flex items-center justify-between text-xs font-mono text-[#20242B]/50">
              <span>K. SURYA SHRAWAN · FIRST YEAR EEE</span>
              <span className="text-[#20242B] font-bold">PAGE {currentPage}</span>
            </div>
          </div>
        </div>

        {/* Bottom Turn-the-Page Controls */}
        <div className="h-14 border-t border-[#20242B]/15 bg-[#FAF9F6] px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded-xs transition-colors cursor-pointer ${
              currentPage === 1
                ? "border-[#20242B]/10 text-[#20242B]/30 cursor-not-allowed"
                : "border-[#20242B]/30 text-[#20242B] hover:border-[#315CFF] hover:text-[#315CFF]"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          {/* Quick Page Picker Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {pages.map((p) => (
              <button
                key={p.pageNumber}
                type="button"
                onClick={() => setCurrentPage(p.pageNumber)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentPage === p.pageNumber
                    ? "bg-[#315CFF] scale-125"
                    : "bg-[#20242B]/20 hover:bg-[#20242B]/50"
                }`}
                title={`Go to page ${p.pageNumber}: ${p.contentTitle}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border rounded-xs transition-colors cursor-pointer ${
              currentPage === totalPages
                ? "border-[#20242B]/10 text-[#20242B]/30 cursor-not-allowed"
                : "border-[#20242B]/30 text-[#20242B] hover:border-[#315CFF] hover:text-[#315CFF]"
            }`}
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
