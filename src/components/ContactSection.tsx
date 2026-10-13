import React, { useState } from "react";
import { profileData } from "../data/profile";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, MapPin, GraduationCap, Compass } from "lucide-react";

interface ContactSectionProps {
  onNavigateAbout?: () => void;
  onNavigateProjects?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigateAbout,
  onNavigateProjects
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-6 sm:py-10 md:py-14 bg-[#FAF9F6] text-[#20242B]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-[#20242B]/10 pb-6 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF] mb-2">
            <span>FOLIO SECTION 05</span>
            <span aria-hidden="true">·</span>
            <span>DIRECT COMMUNICATION & COLLABORATION CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#20242B]">
            Get in Touch & Connect
          </h2>
          <p className="text-sm sm:text-base text-[#112A46]/85 font-serif mt-2 max-w-2xl leading-relaxed">
            Whether you want to discuss circuit design, brainstorm machine learning on edge hardware, collaborate on practical student projects, or simply exchange ideas—my channels are open.
          </p>
        </div>

        {/* Direct Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* 1. Primary Email Card */}
          <div className="p-6 bg-[#FAF9F6] border border-[#20242B]/15 hover:border-[#315CFF] transition-all rounded-xs flex flex-col justify-between shadow-xs hover:shadow-[3px_3px_0px_0px_#315CFF]">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#112A46]/60 pb-3 mb-4 border-b border-[#20242B]/10">
                <span className="flex items-center gap-1.5 text-[#315CFF] font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>PRIMARY EMAIL</span>
                </span>
                <span className="text-[10px] text-[#112A46]/50">DIRECT INBOX</span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#20242B] mb-2">
                Electronic Mail
              </h3>
              <p className="text-xs text-[#112A46]/80 font-serif mb-4 leading-relaxed">
                For in-depth inquiries, technical collaborations, and academic messages.
              </p>

              <div className="p-2.5 bg-white border border-[#20242B]/10 rounded-xs font-mono text-xs text-[#112A46] font-semibold break-all select-all mb-4">
                {profileData.email}
              </div>
            </div>

            <div className="pt-3 border-t border-[#20242B]/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 text-xs font-mono text-[#112A46] hover:text-[#315CFF] px-2.5 py-1.5 border border-[#20242B]/20 rounded-xs transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 bg-[#20242B] text-white hover:bg-[#315CFF] rounded-xs transition-colors"
              >
                <span>Compose</span>
                <ArrowUpRight className="w-3 h-3 text-white/70" />
              </a>
            </div>
          </div>

          {/* 2. LinkedIn Channel Card */}
          <div className="p-6 bg-[#FAF9F6] border border-[#20242B]/15 hover:border-[#315CFF] transition-all rounded-xs flex flex-col justify-between shadow-xs hover:shadow-[3px_3px_0px_0px_#315CFF]">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#112A46]/60 pb-3 mb-4 border-b border-[#20242B]/10">
                <span className="flex items-center gap-1.5 text-[#315CFF] font-semibold">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>PROFESSIONAL</span>
                </span>
                <span className="text-[10px] text-[#112A46]/50">NETWORK</span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#20242B] mb-2">
                LinkedIn Profile
              </h3>
              <p className="text-xs text-[#112A46]/80 font-serif mb-4 leading-relaxed">
                Connect professionally, discuss practical engineering, and follow project updates.
              </p>

              <div className="p-2.5 bg-white border border-[#20242B]/10 rounded-xs font-mono text-xs text-[#112A46] font-semibold truncate mb-4">
                k-surya-shrawan-416307416
              </div>
            </div>

            <div className="pt-3 border-t border-[#20242B]/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#112A46]/50">
                NIT Warangal
              </span>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#0A66C2] text-white hover:bg-[#004182] rounded-xs transition-colors shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>Connect</span>
                <ArrowUpRight className="w-3 h-3 text-white/70" />
              </a>
            </div>
          </div>

          {/* 3. GitHub Repository Card */}
          <div className="p-6 bg-[#FAF9F6] border border-[#20242B]/15 hover:border-[#315CFF] transition-all rounded-xs flex flex-col justify-between shadow-xs hover:shadow-[3px_3px_0px_0px_#315CFF]">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#112A46]/60 pb-3 mb-4 border-b border-[#20242B]/10">
                <span className="flex items-center gap-1.5 text-[#20242B] font-semibold">
                  <Github className="w-3.5 h-3.5" />
                  <span>SOURCE CODE</span>
                </span>
                <span className="text-[10px] text-[#112A46]/50">OPEN ACCESS</span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#20242B] mb-2">
                GitHub Repositories
              </h3>
              <p className="text-xs text-[#112A46]/80 font-serif mb-4 leading-relaxed">
                Explore source code, Jupyter notebooks, commits, and machine learning pipelines.
              </p>

              <div className="p-2.5 bg-white border border-[#20242B]/10 rounded-xs font-mono text-xs text-[#112A46] font-semibold truncate mb-4">
                ksuryashrawan1810-gif
              </div>
            </div>

            <div className="pt-3 border-t border-[#20242B]/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#112A46]/50">
                3 AI/ML Repos
              </span>
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#20242B] text-white hover:bg-[#315CFF] rounded-xs transition-colors shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Code</span>
                <ArrowUpRight className="w-3 h-3 text-white/70" />
              </a>
            </div>
          </div>
        </div>

        {/* Institution Details & Personal Motto Folio Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Context */}
          <div className="p-6 bg-[#FAF9F6] border border-[#20242B]/15 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#315CFF]">
              <GraduationCap className="w-4 h-4" />
              <span className="font-semibold">ACADEMIC DEPARTMENT</span>
            </div>
            <div>
              <div className="font-display font-bold text-base text-[#20242B]">
                {profileData.college}
              </div>
              <div className="text-xs font-serif text-[#112A46]/80 mt-1">
                Department of {profileData.branchFull} ({profileData.year})
              </div>
            </div>
            <div className="pt-2 border-t border-[#20242B]/10 flex items-center gap-2 text-xs font-mono text-[#112A46]/60">
              <MapPin className="w-3.5 h-3.5 text-[#315CFF]" />
              <span>{profileData.location}</span>
            </div>
          </div>

          {/* Builder's Motto Reminder */}
          <div className="p-6 bg-[#E8E7E2]/30 border border-[#20242B]/15 rounded-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#112A46]/60 uppercase mb-2">
                <span className="text-[#315CFF] font-semibold">GUIDING RULE</span>
                <span>FOLIO NO. 05</span>
              </div>
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#112A46] leading-snug">
                "{profileData.motto}"
              </blockquote>
            </div>
            <div className="pt-3 border-t border-[#20242B]/10 text-xs font-mono text-[#112A46]/70 mt-3">
              K. Surya Shrawan · First-Year EEE · NIT Warangal
            </div>
          </div>
        </div>

        {/* Navigation back to About and Projects */}
        <div className="mt-8 pt-6 border-t border-[#20242B]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#112A46]/60">
            <span>EXPLORE OTHER SECTIONS:</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateAbout && (
              <button
                type="button"
                onClick={onNavigateAbout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#20242B]/30 hover:border-[#315CFF] text-[#112A46] hover:text-[#315CFF] rounded-xs transition-colors cursor-pointer bg-white shadow-xs"
              >
                <span>← Back to About</span>
              </button>
            )}
            {onNavigateProjects && (
              <button
                type="button"
                onClick={onNavigateProjects}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#20242B]/30 hover:border-[#315CFF] text-[#112A46] hover:text-[#315CFF] rounded-xs transition-colors cursor-pointer bg-white shadow-xs"
              >
                <span>← Back to Projects</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
