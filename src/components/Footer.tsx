import React from "react";
import { profileData } from "../data/profile";
import { Github, Linkedin, ArrowUpRight, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-[#20242B]/15 py-12 md:py-16 text-[#112A46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#20242B]/10">
          {/* Identity & Closing Statement */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-xs bg-[#20242B] text-[#FAF9F6] font-mono text-xs font-semibold flex items-center justify-center">
                {profileData.monogram}
              </span>
              <span className="font-display font-bold text-lg text-[#20242B]">
                {profileData.name}
              </span>
              <span className="text-xs font-mono text-[#112A46]/50">
                · {profileData.collegeShort}
              </span>
            </div>

            <p className="text-sm text-[#112A46]/85 font-sans leading-relaxed">
              {profileData.footerClosing}
            </p>

            <div className="font-serif italic text-base text-[#315CFF]">
              "{profileData.motto}"
            </div>
          </div>

          {/* Links & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono">
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#112A46] hover:text-[#0A66C2] transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#112A46]/40" />
            </a>

            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#112A46] hover:text-[#315CFF] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>github.com/ksuryashrawan1810-gif</span>
              <ArrowUpRight className="w-3 h-3 text-[#112A46]/40" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#112A46]/70 hover:text-[#112A46] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#112A46]/50">
          <div>
            © {new Date().getFullYear()} {profileData.name} · National Institute of Technology, Warangal
          </div>
          <div>
            Electrical and Electronics Engineering · First Year Journal
          </div>
        </div>
      </div>
    </footer>
  );
};
