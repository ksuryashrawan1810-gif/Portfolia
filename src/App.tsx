/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navigation } from "./components/Navigation";
import { PortfolioBook, BookSection } from "./components/book/PortfolioBook";
import { HeroAbout } from "./components/HeroAbout";
import { AreasOfInterest } from "./components/AreasOfInterest";
import { PersonalPhilosophy } from "./components/PersonalPhilosophy";
import { ProjectPreviewSection } from "./components/projects/ProjectPreviewSection";
import { ContactSection } from "./components/ContactSection";
import { BookJournalReader } from "./components/book/BookJournalReader";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentSection, setCurrentSection] = useState<BookSection>("about");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isJournalReaderOpen, setIsJournalReaderOpen] = useState(false);
  const [journalInitialPage, setJournalInitialPage] = useState(1);

  const handleNavigateSection = (section: BookSection) => {
    setCurrentSection(section);
  };

  const handleOpenJournalAtPage = (pageNumber: number) => {
    setJournalInitialPage(pageNumber);
    setIsJournalReaderOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#112A46] flex flex-col font-serif selection:bg-[#C6E86B] selection:text-[#112A46]">
      {/* 3-Zone Synchronized Navigation Header */}
      <Navigation
        currentSection={currentSection}
        onNavigateSection={handleNavigateSection}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenJournalReader={() => handleOpenJournalAtPage(1)}
      />

      {/* Main Interactive Portfolio Book with 3D Page-Turn Physics */}
      <main className="flex-1 py-4 sm:py-8">
        <PortfolioBook
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          renderAbout={() => (
            <div className="space-y-0">
              <HeroAbout
                onExploreProjects={() => handleNavigateSection("projects")}
                onOpenBookReader={() => handleOpenJournalAtPage(1)}
              />
              <AreasOfInterest />
              <PersonalPhilosophy />
            </div>
          )}
          renderProjects={() => (
            <div className="space-y-0">
              <ProjectPreviewSection
                onOpenJournalPage={handleOpenJournalAtPage}
              />
            </div>
          )}
          renderContact={() => (
            <div className="space-y-0">
              <ContactSection
                onNavigateAbout={() => handleNavigateSection("about")}
                onNavigateProjects={() => handleNavigateSection("projects")}
              />
            </div>
          )}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Digital Folio Spread Reader */}
      <BookJournalReader
        isOpen={isJournalReaderOpen}
        onClose={() => setIsJournalReaderOpen(false)}
        initialPage={journalInitialPage}
      />

      {/* Contact Quick Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
