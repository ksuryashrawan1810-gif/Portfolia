import React, { useState } from "react";
import { profileData } from "../data/profile";
import { Mail, Github, Linkedin, Copy, Check, X, ArrowUpRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#20242B]/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FAF9F6] border-2 border-[#20242B] rounded-xs shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#20242B]/10 mb-6">
          <div>
            <span className="font-mono text-xs text-[#315CFF] block mb-1">
              DIRECT CONTACT CHANNELS
            </span>
            <h3 className="text-2xl font-bold font-display text-[#20242B]">
              Direct Contact Channels
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#20242B] hover:text-[#315CFF] border border-[#20242B]/20 rounded-xs cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-sm text-[#112A46]/85 font-serif leading-relaxed">
            I am always eager to talk about electronics, hardware prototyping, artificial intelligence, practical engineering ideas, or collaborative student projects.
          </p>

          {/* Direct verified contact channels */}
          <div className="space-y-3">
            {/* Email item */}
            <div className="p-3.5 bg-[#FAF9F6] border border-[#20242B]/15 rounded-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-4 h-4 text-[#315CFF] shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] font-mono text-[#112A46]/50 uppercase">Email Address</div>
                  <div className="font-mono text-xs text-[#112A46] font-semibold truncate">
                    {profileData.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[#112A46] hover:text-[#315CFF] border border-[#20242B]/20 rounded-xs transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={`mailto:${profileData.email}`}
                  className="px-2.5 py-1 text-xs font-mono bg-[#20242B] text-white hover:bg-[#315CFF] rounded-xs transition-colors"
                >
                  Open Mail
                </a>
              </div>
            </div>

            {/* LinkedIn item */}
            <div className="p-3.5 bg-[#FAF9F6] border border-[#20242B]/15 rounded-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-[#112A46]/50 uppercase">LinkedIn Network</div>
                  <div className="font-mono text-xs text-[#112A46] font-semibold">
                    k-surya-shrawan-416307416
                  </div>
                </div>
              </div>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 bg-[#0A66C2] text-white hover:bg-[#004182] rounded-xs transition-colors shadow-2xs"
              >
                <span>Connect</span>
                <ArrowUpRight className="w-3 h-3 text-white/70" />
              </a>
            </div>

            {/* GitHub item */}
            <div className="p-3.5 bg-[#FAF9F6] border border-[#20242B]/15 rounded-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4 text-[#112A46] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-[#112A46]/50 uppercase">Source Code & Log</div>
                  <div className="font-mono text-xs text-[#112A46] font-semibold">
                    ksuryashrawan1810-gif
                  </div>
                </div>
              </div>
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 bg-[#20242B] text-white hover:bg-[#315CFF] rounded-xs transition-colors shadow-2xs"
              >
                <span>Profile</span>
                <ArrowUpRight className="w-3 h-3 text-white/70" />
              </a>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-[#20242B]/10 flex items-center justify-between text-[11px] font-mono text-[#112A46]/60">
            <span>NIT Warangal · First Year EEE</span>
            <button
              type="button"
              onClick={onClose}
              className="hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
