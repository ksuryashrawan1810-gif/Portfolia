import React, { useState } from "react";
import { profileData } from "../data/profile";
import { BookSection } from "./book/PortfolioBook";
import { Github, Linkedin, Mail, Menu, X, ArrowUpRight, BookOpen } from "lucide-react";

interface NavigationProps {
  currentSection: BookSection;
  onNavigateSection: (section: BookSection) => void;
  onOpenContactModal: () => void;
  onOpenJournalReader: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onNavigateSection,
  onOpenContactModal,
  onOpenJournalReader
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: BookSection) => {
    onNavigateSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F6]/95 backdrop-blur-xs border-b border-[#20242B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Monogram */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick("about")}
            className="group flex items-center gap-2.5 text-[#20242B] hover:text-[#315CFF] transition-colors cursor-pointer text-left"
          >
            <span className="w-8 h-8 rounded-xs bg-[#20242B] text-[#FAF9F6] font-mono text-xs font-semibold flex items-center justify-center tracking-wider group-hover:bg-[#315CFF] transition-colors">
              {profileData.monogram}
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight whitespace-nowrap">
                {profileData.name}
              </span>
              <span className="text-[11px] font-mono text-[#20242B]/60 leading-none">
                {profileData.collegeShort} · {profileData.branch}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Three Navigable Sections (single line, no pills) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#112A46]/85">
          <button
            type="button"
            onClick={() => handleNavClick("about")}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              currentSection === "about"
                ? "border-[#315CFF] text-[#112A46] font-bold"
                : "border-transparent text-[#112A46]/70 hover:text-[#315CFF]"
            }`}
          >
            About
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("projects")}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              currentSection === "projects"
                ? "border-[#315CFF] text-[#112A46] font-bold"
                : "border-transparent text-[#112A46]/70 hover:text-[#315CFF]"
            }`}
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              currentSection === "contact"
                ? "border-[#315CFF] text-[#112A46] font-bold"
                : "border-transparent text-[#112A46]/70 hover:text-[#315CFF]"
            }`}
          >
            Contact
          </button>

          <button
            type="button"
            onClick={onOpenJournalReader}
            className="font-mono text-xs px-2.5 py-1 border border-[#112A46]/20 text-[#112A46] hover:border-[#315CFF] hover:text-[#315CFF] transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#315CFF]" />
            <span>Digital Folio Spreads</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action, LinkedIn & GitHub */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#112A46] hover:text-[#0A66C2] px-2.5 py-1.5 border border-[#112A46]/20 rounded-xs hover:border-[#0A66C2] transition-colors whitespace-nowrap"
            title="LinkedIn profile"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-[#112A46]/40" />
          </a>

          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#112A46] hover:text-[#315CFF] px-2.5 py-1.5 border border-[#112A46]/20 rounded-xs hover:border-[#315CFF] transition-colors whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#112A46]/40" />
          </a>

          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#20242B] hover:bg-[#315CFF] rounded-xs transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#20242B] hover:text-[#315CFF] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#20242B]/10 bg-[#FAF9F6] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              type="button"
              onClick={() => handleNavClick("about")}
              className={`text-left py-2 ${
                currentSection === "about" ? "text-[#315CFF] font-bold" : "text-[#20242B]"
              }`}
            >
              01. About & Philosophy
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("projects")}
              className={`text-left py-2 ${
                currentSection === "projects" ? "text-[#315CFF] font-bold" : "text-[#20242B]"
              }`}
            >
              02. Projects & Engineering Log
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className={`text-left py-2 ${
                currentSection === "contact" ? "text-[#315CFF] font-bold" : "text-[#20242B]"
              }`}
            >
              03. Contact & Communication
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJournalReader();
              }}
              className="text-left py-2 font-mono text-xs text-[#315CFF] flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Digital Folio Spreads</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#20242B]/10 flex flex-col gap-2">
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0A66C2]"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>linkedin.com/in/k-surya-shrawan-416307416</span>
            </a>
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#112A46]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/ksuryashrawan1810-gif</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
