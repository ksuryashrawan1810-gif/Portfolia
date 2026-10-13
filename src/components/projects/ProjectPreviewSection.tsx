import React, { useState, useEffect } from "react";
import { projectCategories, getCategoryById } from "../../data/projectCategories";
import { projectsData, ProjectItem, validateProjects } from "../../data/projects";
import { ProjectVisual } from "./ProjectVisuals";
import { Github, ArrowUpRight, X, CheckCircle, ExternalLink, Info, Layers, BookOpen } from "lucide-react";

interface ProjectPreviewSectionProps {
  onOpenJournalPage?: (pageNumber: number) => void;
}

export const ProjectPreviewSection: React.FC<ProjectPreviewSectionProps> = ({
  onOpenJournalPage
}) => {
  // Validate that all projects reference registered categories
  useEffect(() => {
    validateProjects();
  }, []);

  // Dynamically derive active categories (only categories that actually contain published projects)
  const activeCategories = projectCategories.filter((cat) =>
    projectsData.some((p) => p.categoryId === cat.id)
  );

  // If there's only 1 category with projects, default to that category; otherwise 'all'
  const initialCategory = activeCategories.length === 1 ? activeCategories[0].id : "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Keyboard dismissal for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProjectModal) {
        setActiveProjectModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProjectModal]);

  // Filter projects based on current selection
  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.categoryId === selectedCategory);

  return (
    <section id="projects" className="py-6 sm:py-10 md:py-14 bg-[#FAF9F6] text-[#20242B]">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#20242B]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF]">
              <span>FOLIO SECTION 04</span>
              <span aria-hidden="true">·</span>
              <span>GITHUB MACHINE LEARNING & AI REPOSITORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#20242B]">
              Projects & Engineering Log
            </h2>
            <p className="text-sm sm:text-base text-[#112A46]/85 font-serif max-w-2xl leading-relaxed">
              Open-source machine learning explorations, text classifiers, and neural architectures published on my GitHub.
            </p>
          </div>

          {/* Dynamic Extensible Category Selector */}
          {/* Only rendered as tabs if more than one category contains projects; otherwise renders clean single category indicator */}
          {activeCategories.length > 1 ? (
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#E8E7E2]/60 border border-[#20242B]/15 rounded-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 text-xs font-mono transition-all rounded-xs cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#20242B] text-[#FAF9F6] font-semibold shadow-xs"
                    : "text-[#112A46]/80 hover:text-[#112A46] hover:bg-[#FAF9F6]/80"
                }`}
              >
                All Projects ({projectsData.length})
              </button>
              {activeCategories.map((cat) => {
                const count = projectsData.filter((p) => p.categoryId === cat.id).length;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-mono transition-all rounded-xs cursor-pointer ${
                      isActive
                        ? "bg-[#20242B] text-[#FAF9F6] font-semibold shadow-xs"
                        : "text-[#112A46]/80 hover:text-[#112A46] hover:bg-[#FAF9F6]/80"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#FAF9F6] border border-[#20242B]/20 rounded-xs text-xs font-mono text-[#112A46]">
              <span className="w-2 h-2 rounded-full bg-[#315CFF]" />
              <span className="font-semibold text-[#20242B]">
                {activeCategories[0]?.name || "AI & Machine Learning"}
              </span>
              <span className="text-[#112A46]/50">({filteredProjects.length} Projects)</span>
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const category = getCategoryById(project.categoryId);

            return (
              <div
                key={project.id}
                className="group relative p-6 sm:p-7 bg-[#FAF9F6] border border-[#20242B]/15 hover:border-[#315CFF] transition-all rounded-xs flex flex-col justify-between shadow-xs hover:shadow-[4px_4px_0px_0px_#315CFF]"
              >
                <div>
                  {/* Top Header Strip: Project Number & Category Badge */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#112A46]/60 pb-3 mb-4 border-b border-[#20242B]/10">
                    <span className="font-bold text-[#315CFF]">
                      PROJECT {project.folioNumber}
                    </span>
                    <span className="text-[#112A46]/70">
                      {category.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-[#20242B] group-hover:text-[#315CFF] transition-colors mb-3">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-[#112A46]/85 font-serif leading-relaxed mb-5">
                    {project.shortDescription}
                  </p>

                  {/* Bespoke Original Technical Visual */}
                  <div className="mb-5">
                    <ProjectVisual visualType={project.visualType} />
                  </div>

                  {/* Key Experimental Result highlight if present */}
                  {project.results?.reportedAccuracy && (
                    <div className="mb-4 p-2.5 bg-[#E8E7E2]/40 border border-[#20242B]/10 rounded-xs text-xs font-mono flex items-center justify-between">
                      <span className="text-[#112A46]/70">REPORTED METRIC:</span>
                      <span className="text-[#315CFF] font-bold">
                        {project.results.reportedAccuracy}
                      </span>
                    </div>
                  )}

                  {/* Technology Tags (Unboxed clean text) */}
                  <div className="mb-6 pt-3 border-t border-[#20242B]/10">
                    <div className="text-[10px] font-mono text-[#112A46]/50 mb-1.5 uppercase">
                      Stack & Tools:
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#112A46]/70">
                      {project.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {tIdx < project.technologies.length - 1 && (
                            <span className="text-[#112A46]/30" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: GitHub Repository & Project Details */}
                <div className="pt-4 border-t border-[#20242B]/10 flex items-center justify-between gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-[#20242B] text-white hover:bg-[#315CFF] rounded-xs transition-colors shadow-xs"
                    title={`Open ${project.title} repository on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-white/70" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono border border-[#20242B]/30 hover:border-[#315CFF] text-[#112A46] hover:text-[#315CFF] rounded-xs transition-colors cursor-pointer"
                  >
                    <span>Project Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {activeProjectModal && (
          <div
            className="fixed inset-0 z-50 bg-[#20242B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveProjectModal(null);
            }}
          >
            <div className="relative w-full max-w-2xl bg-[#FAF9F6] border-2 border-[#20242B] rounded-xs shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#20242B]/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF] mb-1">
                    <span>FOLIO PROJECT {activeProjectModal.folioNumber}</span>
                    <span aria-hidden="true">/</span>
                    <span>{getCategoryById(activeProjectModal.categoryId).name}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#20242B]">
                    {activeProjectModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="p-1.5 text-[#20242B] hover:text-[#315CFF] border border-[#20242B]/20 rounded-xs cursor-pointer"
                  aria-label="Close project detail view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h4 className="font-mono text-xs text-[#112A46]/60 uppercase tracking-wider mb-2 font-semibold">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-[#112A46] font-serif leading-relaxed">
                    {activeProjectModal.overview}
                  </p>
                </div>

                {/* Technical Workflow & Methodology */}
                <div>
                  <h4 className="font-mono text-xs text-[#112A46]/60 uppercase tracking-wider mb-2 font-semibold">
                    Methodology & Pipeline Steps:
                  </h4>
                  <ul className="space-y-2">
                    {activeProjectModal.workflow.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#112A46]/90 font-serif">
                        <span className="font-mono text-xs text-[#315CFF] font-bold mt-0.5">
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Experimental Results & Caveats */}
                {activeProjectModal.results && (
                  <div className="p-4 bg-[#E8E7E2]/30 border border-[#20242B]/15 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF] font-semibold">
                      <Info className="w-4 h-4" />
                      <span>EXPERIMENTAL STATUS & VERIFIED METRICS</span>
                    </div>

                    {activeProjectModal.results.reportedAccuracy && (
                      <div className="text-xs font-mono text-[#112A46]">
                        <span className="text-[#112A46]/60">Reported Accuracy: </span>
                        <span className="font-bold text-[#20242B]">
                          {activeProjectModal.results.reportedAccuracy}
                        </span>
                        {activeProjectModal.results.reportedF1Score && (
                          <span> (F1 Score: {activeProjectModal.results.reportedF1Score})</span>
                        )}
                      </div>
                    )}

                    {activeProjectModal.results.bestModel && (
                      <div className="text-xs font-mono text-[#112A46]">
                        <span className="text-[#112A46]/60">Evaluated Model: </span>
                        <span className="font-semibold text-[#20242B]">
                          {activeProjectModal.results.bestModel}
                        </span>
                      </div>
                    )}

                    {activeProjectModal.results.caveat && (
                      <p className="text-xs text-[#112A46]/80 font-serif italic pt-1 leading-relaxed">
                        *{activeProjectModal.results.caveat}
                      </p>
                    )}
                  </div>
                )}

                {/* Technology Badges */}
                <div>
                  <h4 className="font-mono text-xs text-[#112A46]/60 uppercase tracking-wider mb-2 font-semibold">
                    Technologies & Libraries:
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#112A46]">
                    {activeProjectModal.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white border border-[#20242B]/15 rounded-xs shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action Bar */}
              <div className="mt-8 pt-4 border-t border-[#20242B]/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono bg-[#20242B] text-white hover:bg-[#315CFF] rounded-xs transition-colors shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Code on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {activeProjectModal.demoUrl && (
                  <a
                    href={activeProjectModal.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono bg-[#315CFF] text-white hover:bg-[#20242B] rounded-xs transition-colors shadow-xs"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 text-xs font-mono border border-[#20242B]/20 hover:border-[#20242B] text-[#112A46] rounded-xs transition-colors cursor-pointer ml-auto"
                >
                  Close Folio Log
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
