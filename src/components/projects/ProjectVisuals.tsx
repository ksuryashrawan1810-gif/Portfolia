import React, { useState } from "react";
import { MessageSquare, Image as ImageIcon, BarChart3, CheckCircle2, AlertTriangle, Cpu, Layers } from "lucide-react";

interface ProjectVisualProps {
  visualType: "nlp-messaging" | "cnn-vision" | "analytics-gauge" | "generic";
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ visualType }) => {
  if (visualType === "nlp-messaging") {
    return <NlpMessagingVisual />;
  }
  if (visualType === "cnn-vision") {
    return <CnnVisionVisual />;
  }
  if (visualType === "analytics-gauge") {
    return <LoanAnalyticsVisual />;
  }
  return <GenericEngineeringVisual />;
};

// 1. Spam Detection Visual: SMS bubbles, Tokenizer breakdown, and Classifier Probability
const NlpMessagingVisual: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string>("WINNER");

  const tokens = [
    { text: "URGENT", weight: 0.92, isSpamIndicator: true },
    { text: "claim", weight: 0.85, isSpamIndicator: true },
    { text: "prize", weight: 0.88, isSpamIndicator: true },
    { text: "meeting", weight: 0.05, isSpamIndicator: false },
    { text: "tomorrow", weight: 0.08, isSpamIndicator: false },
    { text: "confirm", weight: 0.12, isSpamIndicator: false }
  ];

  return (
    <div className="w-full bg-[#171A20] text-[#FAF9F6] p-4 sm:p-5 rounded-xs border border-[#20242B] select-none">
      {/* Top Ledger Strip */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-[#C6E86B]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="font-semibold">NLP TEXT TOKENIZER · TF-IDF WEIGHTS</span>
        </div>
        <span className="text-white/40">NLTK / SCIKIT-LEARN</span>
      </div>

      {/* Simulated SMS Message Comparison */}
      <div className="space-y-2.5 mb-3.5">
        {/* Sample Spam Message */}
        <div className="p-2.5 bg-red-950/30 border border-red-500/30 rounded-xs flex items-start gap-2 text-xs">
          <span className="text-[10px] font-mono uppercase px-1 py-0.5 bg-red-500/20 text-red-300 rounded-xs shrink-0 mt-0.5">
            SPAM
          </span>
          <div className="font-serif text-[11px] text-white/90 leading-tight">
            "Congratulations! Claim your guaranteed £1000 prize now by replying YES."
          </div>
        </div>

        {/* Sample Ham Message */}
        <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xs flex items-start gap-2 text-xs">
          <span className="text-[10px] font-mono uppercase px-1 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-xs shrink-0 mt-0.5">
            HAM
          </span>
          <div className="font-serif text-[11px] text-white/90 leading-tight">
            "Hey, let's review the circuit schematic notes in the library tomorrow."
          </div>
        </div>
      </div>

      {/* Token Weight Interactive Inspector */}
      <div className="pt-2 border-t border-white/10">
        <div className="text-[10px] font-mono text-white/50 mb-1.5 flex items-center justify-between">
          <span>FEATURE VECTOR TOKENS (CLICK TO INSPECT):</span>
          <span className="text-[#C6E86B]">LOG-REGRESSION MODEL</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tokens.map((t) => {
            const isSelected = selectedToken === t.text;
            return (
              <button
                key={t.text}
                type="button"
                onClick={() => setSelectedToken(t.text)}
                className={`px-2 py-1 text-[11px] font-mono rounded-xs border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#315CFF] text-white border-[#315CFF] font-semibold"
                    : t.isSpamIndicator
                    ? "bg-white/5 border-red-500/40 text-red-300 hover:bg-white/10"
                    : "bg-white/5 border-emerald-500/40 text-emerald-300 hover:bg-white/10"
                }`}
              >
                <span>{t.text}</span>
                <span className="text-[9px] opacity-60 ml-1">({t.weight.toFixed(2)})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 2. CNN Image Classification Visual: CIFAR-10 Grid & Convolutional Layer Pipeline
const CnnVisionVisual: React.FC = () => {
  const [activeKernel, setActiveKernel] = useState<number>(1);

  const cifarClasses = [
    "airplane", "automobile", "bird", "cat", "deer",
    "dog", "frog", "horse", "ship", "truck"
  ];

  return (
    <div className="w-full bg-[#171A20] text-[#FAF9F6] p-4 sm:p-5 rounded-xs border border-[#20242B] select-none">
      {/* Top Ledger Strip */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-[#315CFF]">
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="font-semibold">CIFAR-10 PIPELINE · CONV2D LAYERS</span>
        </div>
        <span className="text-white/40">KERAS / TENSORFLOW</span>
      </div>

      {/* Layer Architecture Flowchart */}
      <div className="grid grid-cols-4 gap-2 mb-3 text-center text-[10px] font-mono">
        <div className="p-2 bg-white/5 border border-white/10 rounded-xs">
          <div className="text-[#FAF9F6]/50">INPUT</div>
          <div className="font-bold text-white text-xs mt-0.5">32×32×3</div>
          <div className="text-[9px] text-white/40 mt-0.5">RGB Image</div>
        </div>

        <div className="p-2 bg-[#315CFF]/20 border border-[#315CFF]/40 rounded-xs">
          <div className="text-[#315CFF]">CONV2D</div>
          <div className="font-bold text-white text-xs mt-0.5">3×3 Filter</div>
          <div className="text-[9px] text-[#C6E86B] mt-0.5">ReLU Act.</div>
        </div>

        <div className="p-2 bg-white/5 border border-white/10 rounded-xs">
          <div className="text-[#FAF9F6]/50">MAXPOOL</div>
          <div className="font-bold text-white text-xs mt-0.5">2×2 Pool</div>
          <div className="text-[9px] text-white/40 mt-0.5">Dropout</div>
        </div>

        <div className="p-2 bg-emerald-950/30 border border-emerald-500/30 rounded-xs">
          <div className="text-emerald-400">SOFTMAX</div>
          <div className="font-bold text-white text-xs mt-0.5">10 Classes</div>
          <div className="text-[9px] text-emerald-300 mt-0.5">ArgMax Out</div>
        </div>
      </div>

      {/* 10 CIFAR-10 Semantic Classes */}
      <div className="pt-2 border-t border-white/10">
        <div className="text-[10px] font-mono text-white/50 mb-1.5">
          CIFAR-10 DATASET CLASSES:
        </div>
        <div className="flex flex-wrap gap-1">
          {cifarClasses.map((cls, idx) => (
            <span
              key={cls}
              className="px-1.5 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 text-white/80 rounded-xs"
            >
              <span className="text-[#315CFF] mr-0.5">0{idx}</span> {cls}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Loan Approval Prediction Visual: Financial Features & Random Forest Decision
const LoanAnalyticsVisual: React.FC = () => {
  const [applicantTier, setApplicantTier] = useState<"standard" | "high-risk">("standard");

  return (
    <div className="w-full bg-[#171A20] text-[#FAF9F6] p-4 sm:p-5 rounded-xs border border-[#20242B] select-none">
      {/* Top Ledger Strip */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-[#C6E86B]">
          <BarChart3 className="w-3.5 h-3.5" />
          <span className="font-semibold">FEATURE CORRELATION · ENSEMBLE DECISION</span>
        </div>
        <span className="text-white/40">RANDOM FOREST / STREAMLIT</span>
      </div>

      {/* Key Feature Metric Rows */}
      <div className="space-y-2 mb-3">
        {/* Metric 1: Credit History */}
        <div className="flex items-center justify-between text-xs font-mono p-2 bg-white/5 border border-white/10 rounded-xs">
          <span className="text-white/70">CREDIT HISTORY (CHI-SQ p &lt; 0.001)</span>
          <span className="text-[#C6E86B] font-bold">PRIMARY PREDICTOR</span>
        </div>

        {/* Metric 2: Income vs Loan Ratio */}
        <div className="flex items-center justify-between text-xs font-mono p-2 bg-white/5 border border-white/10 rounded-xs">
          <span className="text-white/70">APPLICANT INCOME RATIO</span>
          <span className="text-white font-semibold">PEARSON r = 0.42</span>
        </div>

        {/* Metric 3: Random Forest Decision */}
        <div className="flex items-center justify-between text-xs font-mono p-2 bg-emerald-950/30 border border-emerald-500/30 rounded-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-semibold">TEST ACCURACY REPORTED</span>
          </div>
          <span className="text-emerald-300 font-bold">92.11%</span>
        </div>
      </div>

      {/* Pipeline Status Footnote */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
        <span>ESTIMATORS: 100 TREES</span>
        <span className="text-white/70">FEATURE NORMALIZED</span>
      </div>
    </div>
  );
};

// Generic Fallback
const GenericEngineeringVisual: React.FC = () => {
  return (
    <div className="w-full bg-[#171A20] text-[#FAF9F6] p-4 rounded-xs border border-[#20242B] font-mono text-xs">
      <div className="flex items-center gap-2 text-[#315CFF]">
        <Cpu className="w-4 h-4" />
        <span>ENGINEERING EXPERIMENT LOG</span>
      </div>
    </div>
  );
};
