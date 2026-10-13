# K. Surya Shrawan — Portfolio & Engineering Journal

A distinctive, high-craft personal portfolio and digital engineering journal for **K. Surya Shrawan**, first-year Electrical & Electronics Engineering (EEE) student at the **National Institute of Technology, Warangal (NIT Warangal)**.

- **Design Philosophy**: *"Curiosity, made tangible."*
- **Personal Motto**: *"You never know until you try."*
- **Live Profile**: [GitHub Profile](https://github.com/ksuryashrawan1810-gif) · [LinkedIn Profile](https://www.linkedin.com/in/k-surya-shrawan-416307416/) · [Email](mailto:ksuryashrawan1810@gmail.com)

---

## 1. Overview & Identity

This portfolio represents an authentic reflection of a first-year engineering student developing practical, hands-on capabilities through continuous experimentation. Rather than presenting exaggerated claims of senior expertise, the platform honestly captures active exploratory tracks across artificial intelligence, machine learning, circuit prototyping, and hardware-software systems.

### Core Identity & Academic Standing
- **Full Name**: K. Surya Shrawan
- **Institution**: National Institute of Technology, Warangal (NIT Warangal)
- **Academic Standing**: First Year
- **Branch**: Electrical and Electronics Engineering (EEE)
- **Headline**: *"I learn by building."*
- **Personal Motto**: *"You never know until you try."*

---

## 2. Published Projects & Verified GitHub Repositories

The project showcase is directly built around three real open-source repositories published on GitHub:

1. **Spam Detection (NLP SMS Classifier)**
   - **Repository**: [https://github.com/ksuryashrawan1810-gif/Spam-Detection](https://github.com/ksuryashrawan1810-gif/Spam-Detection)
   - **Description**: An exploratory text classification study examining how text preprocessing (stopword filtering, tokenization, CountVectorizer, and TF-IDF) influences supervised classifiers (Logistic Regression, Support Vector Machine, and Naive Bayes).
   - **Reported Metrics**: 97.67% accuracy, 90.51% F1 score (documented in repository README).
   - **Stack**: Python, Pandas, NLTK, Scikit-learn.

2. **CNN Image Classification (CIFAR-10)**
   - **Repository**: [https://github.com/ksuryashrawan1810-gif/CNN-project](https://github.com/ksuryashrawan1810-gif/CNN-project)
   - **Description**: Architectural design exploration constructing a deep convolutional neural network (`Conv2D` + `MaxPooling2D` + `Dropout` + `Dense Softmax`) for 10-class visual recognition on the CIFAR-10 dataset.
   - **Status**: Convolutional pipeline defined and documented.
   - **Stack**: Python, TensorFlow, Keras, Computer Vision, CIFAR-10.

3. **Loan Approval Prediction**
   - **Repository**: [https://github.com/ksuryashrawan1810-gif/Loan-Approval](https://github.com/ksuryashrawan1810-gif/Loan-Approval)
   - **Description**: An end-to-end machine learning workflow analyzing applicant demographics, credit histories, and financial metrics to predict loan eligibility, paired with feature significance testing and an interactive Streamlit UI.
   - **Reported Metrics**: 92.11% accuracy with Random Forest Classifier.
   - **Stack**: Python, Pandas, NumPy, Scikit-learn, Random Forest, Streamlit.

---

## 3. Extensible Category Architecture

The portfolio implements a centralized, data-driven categorization system in `src/data/projectCategories.ts`.

### Current Configuration
For the initial release, only **AI & Machine Learning** (`id: "ai-ml"`) contains published projects. Empty future categories (such as Hardware & Electronics, Robotics, Automation, and Developer Tools) are automatically hidden in the interface to keep the showcase strictly grounded in published work.

### How to Add a New Category & Assign Projects

#### Step 1: Register Category in `src/data/projectCategories.ts`
```typescript
export const projectCategories: ProjectCategory[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    code: "CAT-AIML",
    description: "NLP, computer vision, and machine learning classifiers."
  },
  // Adding your new category:
  {
    id: "hardware",
    name: "Hardware & Electronics",
    code: "CAT-EEE",
    description: "Microcontroller circuits, sensor nodes, and analog electronics."
  }
];
```

#### Step 2: Assign Projects in `src/data/projects.ts`
```typescript
{
  id: "esp32-sensor-node",
  title: "ESP32 Sensor Telemetry Node",
  folioNumber: "04",
  categoryId: "hardware", // Matches the ID created above
  shortDescription: "Low-power environmental sensor telemetry over I2C.",
  overview: "Detailed bench prototyping notes...",
  workflow: [
    "Schematic capture and power stage regulation",
    "I2C sensor communication and calibration",
    "Firmware build with RTOS tasks"
  ],
  technologies: ["C++", "ESP32", "I2C", "Analog Circuits"],
  githubUrl: "https://github.com/ksuryashrawan1810-gif/esp32-sensor-node",
  visualType: "generic"
}
```

#### Automatic UI Adaptations:
1. **Filter Tabs**: When more than one category contains projects, interactive filter tabs (`All Projects`, `AI & Machine Learning`, `Hardware & Electronics`) automatically render.
2. **Category Validation**: The startup validator `validateProjects()` verifies that every project references an existing, valid category ID and logs diagnostic warnings if an unregistered ID is referenced.
3. **Modal & Folio Sync**: Project detail modals, cards, and folio spreads dynamically pull category names without modifying any React components.

---

## 4. Physical Book Page-Turn Animation & UX

The portfolio's signature interaction is a believable 3D page-turn animation modeled after a physical engineering notebook:

- **CSS 3D Transforms**: Uses `perspective: 2400px`, `transform-style: preserve-3d`, `transform-origin: left center`, and animated `rotateY` transforms.
- **Physical Notebook Cues**: Includes a bound spine with metallic rivets, paper texture grids, realistic folio drop-shadows, and double-sided leaves (recto and verso folio pages).
- **Synchronized State**: Folio tabs, previous/next controls, and top navigation links remain strictly synchronized.
- **Keyboard Navigation**:
  - <kbd>←</kbd> (Left Arrow) / <kbd>→</kbd> (Right Arrow): Turn to Previous / Next Folio
  - <kbd>1</kbd>: Jump to Folio 01 (About & Philosophy)
  - <kbd>2</kbd>: Jump to Folio 02 (Engineering Log & Projects)
  - <kbd>3</kbd>: Jump to Folio 03 (Contact & Connect)
- **Accessibility & Reduced Motion**: Automatically honors the `prefers-reduced-motion: reduce` system setting by substituting 3D turns with instant, non-jarring state transitions.

---

## 5. Typography & Color Palette

- **Typography**:
  - **Headings & Display**: `Montserrat` (Sans-serif) for architectural clarity
  - **Body Copy**: `Lora` (Serif) for warm editorial reading
  - **Technical Annotations**: `JetBrains Mono` (Monospace)
- **Text Color Discipline**:
  - `#112A46` applied to body text, paragraphs, labels, and descriptions
  - `#20242B` applied to titles, headers, and folio binding marks
  - `#315CFF` (Cobalt Blue) and `#C6E86B` (Technical Lime) used as restrained accents
  - `#FAF9F6` (Warm Drafting White) page background

---

## 6. Installation & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### Setup
```bash
# Clone the repository
git clone https://github.com/ksuryashrawan1810-gif/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 7. Production Build & Verification

```bash
# Type check and lint
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

The build compiles into the `dist/` directory with zero errors and minified assets.

---

## 8. Deployment to Vercel

The application is fully compatible with Vercel and modern static hosting platforms:

1. **Push to GitHub**: Push your codebase to your GitHub repository.
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository.
   - Framework Preset: **Vite** (auto-detected).
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
3. **Deploy**: Click **Deploy**. Vercel will build and deploy the portfolio with automatic global CDN caching, SSL, and instant preview branches.
4. **Custom Domain**: You can attach a custom domain (e.g., `suryashrawan.dev`) under Vercel Project Settings > Domains.

A turnkey `vercel.json` file is included in the project root to handle client-side routing rewrites.

### Troubleshooting Vercel Deployments

If you encounter an issue during deployment, check these common items:
- **Node.js Version**: In Vercel Project Settings > General > Node.js Version, ensure **20.x** or higher is selected (this repository requires Node >= 20).
- **Framework Preset**: Verify the Framework Preset is set to **Vite**.
- **Root Directory**: If your code is inside a subfolder in your repository, set the "Root Directory" in Vercel to that folder.
- **Clean Lockfile**: The project includes a validated `package-lock.json` with resolved dependencies, ensuring `npm install` runs smoothly without peer dependency conflicts.
- **Environment Variables**: No external environment variables or API keys are required for this portfolio.

---

## 9. Contact & Social Channels

- **Email**: [ksuryashrawan1810@gmail.com](mailto:ksuryashrawan1810@gmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/k-surya-shrawan-416307416/](https://www.linkedin.com/in/k-surya-shrawan-416307416/)
- **GitHub**: [https://github.com/ksuryashrawan1810-gif](https://github.com/ksuryashrawan1810-gif)
- **Institution**: National Institute of Technology, Warangal (NIT Warangal), Telangana, India
