export interface AreaOfInterest {
  id: string;
  title: string;
  shortTag: string;
  description: string;
  curiosityNotes: string;
  focusTopics: string[];
}

export interface PhilosophyPillar {
  number: string;
  title: string;
  subtitle: string;
  reflection: string;
}

export interface ProfileData {
  name: string;
  monogram: string;
  college: string;
  collegeShort: string;
  year: string;
  branch: string;
  branchFull: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  headline: string;
  concept: string;
  motto: string;
  bioParagraphs: string[];
  areasOfInterest: AreaOfInterest[];
  philosophyPillars: PhilosophyPillar[];
  footerClosing: string;
}

export const profileData: ProfileData = {
  name: "K. Surya Shrawan",
  monogram: "KSR",
  college: "National Institute of Technology, Warangal",
  collegeShort: "NIT Warangal",
  year: "First year",
  branch: "EEE",
  branchFull: "Electrical and Electronics Engineering",
  location: "Warangal, Telangana, India",
  githubUrl: "https://github.com/ksuryashrawan1810-gif",
  linkedinUrl: "https://www.linkedin.com/in/k-surya-shrawan-416307416/",
  email: "ksuryashrawan1810@gmail.com",
  headline: "I learn by building.",
  concept: "Curiosity, made tangible.",
  motto: "You never know until you try.",
  bioParagraphs: [
    "Hi, I'm K. Surya Shrawan, a first-year Electrical and Electronics Engineering student at NIT Warangal.",
    "I'm curious about the intersection of artificial intelligence, technology, and hardware. I enjoy learning by building things myself, experimenting with ideas, figuring out how things work, and developing practical skills through hands-on projects.",
    "I don't want to limit myself to just one field. I want to explore unfamiliar areas, innovate, and create things that can make a meaningful difference in people's lives. Whether it's trying a new technology, building a small experiment, or exploring an idea beyond my comfort zone, I believe there is always something worth learning.",
    "I'm also interested in business and how technical ideas can become useful real-world solutions. For me, learning is not just about knowing how something works; it's about having the curiosity to try it, the patience to understand it, and the courage to create something with it."
  ],
  areasOfInterest: [
    {
      id: "ai-ml",
      title: "AI and Machine Learning",
      shortTag: "Intelligence",
      description: "Understanding deep learning fundamentals, neural network intuition, and how intelligent models can run efficiently on edge silicon.",
      curiosityNotes: "Exploring model quantization, computer vision pipelines, and applying inference to real physical inputs.",
      focusTopics: ["Neural Networks", "Edge AI", "Computer Vision", "Model Optimization"]
    },
    {
      id: "hardware-electronics",
      title: "Hardware and Electronics",
      shortTag: "Circuits & Silicon",
      description: "Hands-on work with microcontrollers, circuit analysis, sensors, power stages, and debugging physical signals with oscilloscopes.",
      curiosityNotes: "Investigating analog-to-digital conversions, motor drivers, low-power firmware, and PCB schematic design.",
      focusTopics: ["Microcontrollers", "Analog Circuits", "Sensor Arrays", "Signal Integrity"]
    },
    {
      id: "automation-agents",
      title: "Automation and AI Agents",
      shortTag: "Systems",
      description: "Building automated workflows and exploring autonomous agent architectures that bridge software routines with external APIs and real devices.",
      curiosityNotes: "Designing deterministic state machines combined with adaptable LLM reasoning for real task execution.",
      focusTopics: ["Agentic Workflows", "API Integration", "Hardware-in-the-Loop", "Task Orchestration"]
    },
    {
      id: "experimentation-prototyping",
      title: "Experimentation and Prototyping",
      shortTag: "Methodology",
      description: "Rapid iteration cycles from notebook sketch to breadboard prototype, testing edge cases, and learning from immediate hardware failures.",
      curiosityNotes: "Embracing first-principles physics: measuring before assuming, soldering prototypes, and validating hypotheses.",
      focusTopics: ["Bench Testing", "Rapid Prototyping", "Failure Analysis", "First Principles"]
    },
    {
      id: "tech-business",
      title: "Technology and Business",
      shortTag: "Impact",
      description: "Connecting technical engineering rigor to economic viability, product-market validation, and creating tools that solve authentic human needs.",
      curiosityNotes: "Studying how research and deep engineering translate into scalable ventures, sustainable unit economics, and community value.",
      focusTopics: ["Product Thinking", "Scalability", "Unit Economics", "Societal Utility"]
    }
  ],
  philosophyPillars: [
    {
      number: "01",
      title: "Explore the Unfamiliar",
      subtitle: "Beyond comfort zones",
      reflection: "Not limiting oneself to what is already understood. Stepping into uncharted disciplines—whether a foreign software stack, an unfamiliar circuit topology, or an untested hypothesis—is where genuine breakthroughs start."
    },
    {
      number: "02",
      title: "Learn by Experimentation",
      subtitle: "Hands-on over passive theory",
      reflection: "Textbooks supply the equations, but the workbench reveals the nuance. Prototyping, burning a resistor, re-wiring, and observing real behavior turns abstract ideas into ingrained physical intuition."
    },
    {
      number: "03",
      title: "Build for Meaningful Impact",
      subtitle: "Engineering with purpose",
      reflection: "Technology is at its best when it solves genuine problems for real people. Practical engineering should elevate human lives, simplify daily burdens, and create lasting utility rather than complexity for its own sake."
    },
    {
      number: "04",
      title: "Curiosity, Patience & Courage",
      subtitle: "The builder's triad",
      reflection: "Curiosity sparks the question. Patience sustains the deep debugging when things inevitably refuse to work. Courage provides the audacity to launch, test in public, and build something tangible."
    }
  ],
  footerClosing: "Built with curiosity, code, and breadboards. National Institute of Technology, Warangal."
};
