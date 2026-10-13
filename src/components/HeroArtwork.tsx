import React, { useState, useEffect } from "react";
import { Cpu, Activity, Zap, Compass, RefreshCw } from "lucide-react";

export const HeroArtwork: React.FC = () => {
  const [probeMode, setProbeMode] = useState<"sine" | "pwm" | "clock">("sine");
  const [frequency, setFrequency] = useState<number>(2.4);
  const [tick, setTick] = useState<number>(0);

  // Smooth waveform animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Generate waveform SVG path
  const generateWaveform = () => {
    const width = 280;
    const height = 70;
    const midY = height / 2;
    const points: string[] = [];

    for (let x = 0; x <= width; x += 4) {
      let y = midY;
      const phase = (x * 0.05 * frequency + tick * 0.08);

      if (probeMode === "sine") {
        y = midY + Math.sin(phase) * 22;
      } else if (probeMode === "pwm") {
        // Pulse width modulation wave
        const duty = Math.sin(tick * 0.02) * 0.3 + 0.5;
        const normalizedPhase = (phase % (2 * Math.PI)) / (2 * Math.PI);
        y = normalizedPhase < duty ? midY - 22 : midY + 22;
      } else {
        // Clean square clock wave
        const normalizedPhase = (phase % (2 * Math.PI)) / (2 * Math.PI);
        y = normalizedPhase < 0.5 ? midY - 20 : midY + 20;
      }

      points.push(`${x},${y.toFixed(1)}`);
    }

    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[520px] bg-[#FAF9F6] border border-[#20242B]/15 rounded-xs p-5 md:p-6 shadow-xs flex flex-col justify-between overflow-hidden group">
      {/* Drafting Paper Grid Background */}
      <div className="absolute inset-0 engineering-grid opacity-60 pointer-events-none" />

      {/* Top Drafting Header / Registration Marks */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#20242B]/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#315CFF]" />
          <span className="font-mono text-[11px] tracking-wider text-[#20242B]/80 font-medium">
            FIG. 1.0 · SCHEMATIC FOLIO & SIGNAL PROBE
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-[#20242B]/50">
          <span>SYS.NITW/EEE</span>
          <span>·</span>
          <span>FOLIO NO. 01</span>
        </div>
      </div>

      {/* Main Drafting Canvas with Schematic Vector Lines */}
      <div className="relative z-10 my-4 flex-1 flex flex-col justify-center">
        {/* Circuit Schematic Diagram Vector */}
        <div className="w-full relative py-2">
          <svg
            viewBox="0 0 460 210"
            className="w-full h-auto text-[#20242B] stroke-current stroke-[1.25] fill-none"
            aria-label="Engineering circuit schematic diagram"
          >
            {/* Guide Grid Crosshairs */}
            <circle cx="20" cy="20" r="2" className="fill-[#20242B]/30 stroke-none" />
            <circle cx="440" cy="20" r="2" className="fill-[#20242B]/30 stroke-none" />
            <circle cx="20" cy="190" r="2" className="fill-[#20242B]/30 stroke-none" />
            <circle cx="440" cy="190" r="2" className="fill-[#20242B]/30 stroke-none" />

            {/* Power Rail V_CC */}
            <line x1="40" y1="35" x2="420" y2="35" strokeDasharray="3 3" className="stroke-[#20242B]/30" />
            <text x="40" y="26" className="text-[9px] font-mono fill-[#315CFF] stroke-none font-semibold">
              +3.3V REGULATED RAIL
            </text>

            {/* Ground Rail */}
            <line x1="40" y1="180" x2="420" y2="180" className="stroke-[#20242B]/40" />
            <g transform="translate(230, 180)">
              <line x1="-10" y1="0" x2="10" y2="0" />
              <line x1="-6" y1="3" x2="6" y2="3" />
              <line x1="-2" y1="6" x2="2" y2="6" />
              <text x="14" y="5" className="text-[8px] font-mono fill-[#20242B]/60 stroke-none">GND</text>
            </g>

            {/* Central Microcontroller Block */}
            <rect
              x="170"
              y="60"
              width="120"
              height="90"
              className="fill-[#FAF9F6] stroke-[#20242B] stroke-[1.5]"
            />
            {/* IC Label */}
            <text
              x="230"
              y="85"
              textAnchor="middle"
              className="text-[11px] font-mono fill-[#20242B] stroke-none font-bold tracking-tight"
            >
              CORE-MCU
            </text>
            <text
              x="230"
              y="98"
              textAnchor="middle"
              className="text-[8px] font-mono fill-[#20242B]/60 stroke-none"
            >
              CORTEX-M0+ / 16MHz
            </text>

            {/* IC Pin Indicators */}
            {/* Left Pins */}
            <line x1="150" y1="80" x2="170" y2="80" />
            <circle cx="150" cy="80" r="2.5" className="fill-[#315CFF] stroke-none" />
            <text x="175" y="83" className="text-[8px] font-mono fill-[#20242B]/70 stroke-none">PA0 (ADC)</text>

            <line x1="150" y1="105" x2="170" y2="105" />
            <circle cx="150" cy="105" r="2" className="fill-[#20242B] stroke-none" />
            <text x="175" y="108" className="text-[8px] font-mono fill-[#20242B]/70 stroke-none">PA1 (SDA)</text>

            <line x1="150" y1="130" x2="170" y2="130" />
            <circle cx="150" cy="130" r="2" className="fill-[#20242B] stroke-none" />
            <text x="175" y="133" className="text-[8px] font-mono fill-[#20242B]/70 stroke-none">PA2 (SCL)</text>

            {/* Right Pins */}
            <line x1="290" y1="80" x2="310" y2="80" />
            <circle cx="310" cy="80" r="2.5" className="fill-[#C6E86B] stroke-[#20242B] stroke-[1]" />
            <text x="260" y="83" className="text-[8px] font-mono fill-[#20242B]/70 stroke-none">PB0 (PWM)</text>

            <line x1="290" y1="105" x2="310" y2="105" />
            <circle cx="310" cy="105" r="2" className="fill-[#20242B] stroke-none" />
            <text x="260" y="108" className="text-[8px] font-mono fill-[#20242B]/70 stroke-none">PB1 (TX)</text>

            <line x1="290" y1="130" x2="310" y2="130" />
            <circle cx="310" cy="130" r="2" className="fill-[#20242B] stroke-none" />
            <text x="260" y="133" className="text-[8px] font-mono fill-[#20242B]/70 stroke-none">PB2 (RX)</text>

            {/* Left Analog Sensor & Op-Amp Circuit */}
            {/* Input wire */}
            <line x1="60" y1="80" x2="95" y2="80" />
            {/* Resistor symbol */}
            <path d="M 95 80 L 100 74 L 105 86 L 110 74 L 115 86 L 120 74 L 125 80" />
            <line x1="125" y1="80" x2="150" y2="80" />
            <text x="100" y="70" className="text-[8px] font-mono fill-[#20242B]/60 stroke-none">10kΩ</text>

            {/* Filter Capacitor to GND */}
            <line x1="135" y1="80" x2="135" y2="115" />
            {/* Capacitor parallel plates */}
            <line x1="128" y1="115" x2="142" y2="115" strokeWidth="1.5" />
            <line x1="128" y1="120" x2="142" y2="120" strokeWidth="1.5" />
            <line x1="135" y1="120" x2="135" y2="140" />
            <line x1="130" y1="140" x2="140" y2="140" />
            <text x="146" y="120" className="text-[8px] font-mono fill-[#20242B]/60 stroke-none">100nF</text>

            {/* Right Output Filter / Load */}
            <line x1="310" y1="80" x2="350" y2="80" />
            {/* RC Low Pass Filter */}
            <path d="M 350 80 L 355 74 L 360 86 L 365 74 L 370 86 L 375 74 L 380 80" />
            <line x1="380" y1="80" x2="415" y2="80" />
            <circle cx="415" cy="80" r="3" className="fill-[#315CFF] stroke-none" />
            <text x="360" y="70" className="text-[8px] font-mono fill-[#20242B]/60 stroke-none">4.7kΩ</text>
            <text x="390" y="95" className="text-[8px] font-mono fill-[#315CFF] stroke-none font-bold">CH1 PROBE</text>

            {/* Oscilloscope test lead connection */}
            <path
              d="M 415 80 C 430 80, 435 110, 415 130"
              strokeDasharray="2 2"
              className="stroke-[#315CFF]"
            />
          </svg>
        </div>

        {/* Live Signal Oscilloscope Trace Viewport */}
        <div className="mt-3 bg-[#20242B] text-[#FAF9F6] p-3 rounded-xs border border-[#20242B]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#FAF9F6]/10 text-[10px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6E86B]" />
              <span className="text-[#FAF9F6]/80 font-semibold">SIGNAL TRACE · CH1</span>
              <span className="text-[#FAF9F6]/40">({probeMode.toUpperCase()})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#C6E86B] tabular-nums font-mono">
                {(frequency * 1.25).toFixed(2)} kHz
              </span>
              <span className="text-[#FAF9F6]/50 tabular-nums font-mono">3.30 Vpp</span>
            </div>
          </div>

          {/* Oscilloscope Screen with Grid and Glowing Waveform */}
          <div className="relative w-full h-[65px] bg-[#171a20] rounded-xs overflow-hidden flex items-center justify-center">
            {/* Scope Grid lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #FAF9F6 1px, transparent 1px), linear-gradient(to bottom, #FAF9F6 1px, transparent 1px)",
                backgroundSize: "20px 16px"
              }}
            />
            {/* Center crosshair */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#FAF9F6]/20" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#FAF9F6]/20" />

            {/* Dynamic Signal Path */}
            <svg
              className="w-full h-full relative z-10"
              viewBox="0 0 280 70"
              preserveAspectRatio="none"
            >
              <path
                d={generateWaveform()}
                fill="none"
                stroke="#C6E86B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Interactive Probe Controls */}
          <div className="mt-2.5 pt-2 border-t border-[#FAF9F6]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-1">
              <span className="text-[#FAF9F6]/50 text-[10px] mr-1">WAVEFORM:</span>
              <button
                type="button"
                onClick={() => setProbeMode("sine")}
                className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  probeMode === "sine"
                    ? "bg-[#315CFF] text-white font-medium"
                    : "text-[#FAF9F6]/70 hover:bg-[#FAF9F6]/10"
                }`}
              >
                Analog Sine
              </button>
              <button
                type="button"
                onClick={() => setProbeMode("pwm")}
                className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  probeMode === "pwm"
                    ? "bg-[#315CFF] text-white font-medium"
                    : "text-[#FAF9F6]/70 hover:bg-[#FAF9F6]/10"
                }`}
              >
                PWM Pulse
              </button>
              <button
                type="button"
                onClick={() => setProbeMode("clock")}
                className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  probeMode === "clock"
                    ? "bg-[#315CFF] text-white font-medium"
                    : "text-[#FAF9F6]/70 hover:bg-[#FAF9F6]/10"
                }`}
              >
                Clock Pulse
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFrequency((f) => (f >= 4.0 ? 1.2 : +(f + 0.8).toFixed(1)))}
              className="text-[#FAF9F6]/80 hover:text-[#C6E86B] flex items-center gap-1 transition-colors cursor-pointer text-[10px]"
              title="Cycle Probe Frequency"
            >
              <RefreshCw className="w-3 h-3" />
              <span>CYCLE FREQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Engineering Annotation Strip */}
      <div className="relative z-10 pt-3 border-t border-[#20242B]/10 flex items-center justify-between text-[10px] font-mono text-[#20242B]/70">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-[#315CFF]" />
          <span>BENCH REF: FIRST-YEAR HARDWARE LAB</span>
        </div>
        <div className="flex items-center gap-1 text-[#20242B]/50">
          <span>SHEET 01/04</span>
          <span>·</span>
          <span>NIT WARANGAL</span>
        </div>
      </div>
    </div>
  );
};
