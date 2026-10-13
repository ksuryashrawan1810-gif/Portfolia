export interface ProjectCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  accentColor?: string;
}

/**
 * Central Category Configuration
 * To add a new category in the future:
 * 1. Add a new entry to the `projectCategories` array below.
 * 2. Assign the new category's `id` to one or more projects in `src/data/projects.ts`.
 * 3. The UI automatically displays the new category and filter tab without modifying components.
 */
export const projectCategories: ProjectCategory[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    code: "CAT-AIML",
    description: "Natural language processing, convolutional neural networks, and tabular predictive classification.",
    accentColor: "#315CFF"
  },
  // Future Extensible Categories (will automatically activate when a project references their ID):
  {
    id: "hardware",
    name: "Hardware & Electronics",
    code: "CAT-EEE",
    description: "Microcontroller circuits, sensor integration, and analog electronics.",
    accentColor: "#C6E86B"
  },
  {
    id: "automation",
    name: "Automation & AI Agents",
    code: "CAT-AUTO",
    description: "Autonomous task runners, developer utilities, and agent workflows.",
    accentColor: "#F59E0B"
  },
  {
    id: "robotics",
    name: "Robotics",
    code: "CAT-ROBO",
    description: "Motor drivers, kinematics, and embedded real-time robotics.",
    accentColor: "#10B981"
  },
  {
    id: "developer-tools",
    name: "Software & Developer Tools",
    code: "CAT-DEV",
    description: "CLI utilities, developer productivity scripts, and local tooling.",
    accentColor: "#8B5CF6"
  }
];

/**
 * Helper to get a category by its ID with validation fallback.
 */
export const getCategoryById = (categoryId: string): ProjectCategory => {
  const found = projectCategories.find((cat) => cat.id === categoryId);
  if (!found) {
    return {
      id: categoryId,
      name: categoryId,
      code: "CAT-GEN",
      description: "General project folio"
    };
  }
  return found;
};
