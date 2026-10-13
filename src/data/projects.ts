import { projectCategories } from "./projectCategories";

export interface ProjectResults {
  reportedAccuracy?: string;
  reportedF1Score?: string;
  bestModel?: string;
  caveat?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  folioNumber: string;
  categoryId: string;
  shortDescription: string;
  overview: string;
  workflow: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl?: string; // Only provided when a verified working deployment URL exists
  results?: ProjectResults;
  visualType: "nlp-messaging" | "cnn-vision" | "analytics-gauge" | "generic";
}

export const projectsData: ProjectItem[] = [
  {
    id: "spam-detection",
    title: "Spam Detection (NLP SMS Classifier)",
    folioNumber: "01",
    categoryId: "ai-ml",
    shortDescription:
      "An NLP-based SMS classifier exploring how text preprocessing and machine learning can distinguish spam messages from legitimate conversations.",
    overview:
      "An exploratory text classification study examining the step-by-step impact of natural language preprocessing—from punctuation cleaning and stopword filtering to count-based and frequency-based vectorization—on classical supervised classifiers.",
    workflow: [
      "Text normalization and cleaning: lowercasing, punctuation, and digit stripping",
      "Tokenization and English stopword elimination utilizing NLTK",
      "Feature vectorization: Bag of Words (CountVectorizer) and Term Frequency-Inverse Document Frequency (TF-IDF)",
      "Model training and comparative trials: Logistic Regression, Support Vector Machine (SVM), and Gaussian Naive Bayes",
      "Diagnostic performance evaluation across Precision, Recall, Accuracy, and F1 metrics"
    ],
    technologies: [
      "Python",
      "Pandas",
      "NLTK",
      "Scikit-learn",
      "NLP",
      "Text Classification"
    ],
    githubUrl: "https://github.com/ksuryashrawan1810-gif/Spam-Detection",
    results: {
      reportedAccuracy: "97.67%",
      reportedF1Score: "90.51%",
      bestModel: "Logistic Regression (with Bag of Words)",
      caveat:
        "Reported experimental metrics documented in the repository README. Note: The repository documentation highlights an implementation consideration in the comparative SVM trial."
    },
    visualType: "nlp-messaging"
  },
  {
    id: "cnn-image-classification",
    title: "CNN Image Classification (CIFAR-10)",
    folioNumber: "02",
    categoryId: "ai-ml",
    shortDescription:
      "Exploring convolutional neural networks for image classification using TensorFlow/Keras and the CIFAR-10 dataset.",
    overview:
      "An architectural design exploration constructing a deep convolutional neural network for 10-class multi-category visual recognition on the CIFAR-10 benchmark image dataset.",
    workflow: [
      "Dataset ingestion: 60,000 32x32 color images across 10 semantic classes (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck)",
      "Pixel normalization: rescaling input color channels from [0, 255] to [0.0, 1.0]",
      "Convolutional feature extraction: 2D convolutional filter layers paired with ReLU activation functions",
      "Spatial pooling: MaxPooling2D operations to reduce dimensionality and extract shift-invariant spatial hierarchies",
      "Regularization and dense classification: Dropout layer to mitigate overfitting, Flatten stage, and Softmax dense output"
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "CNN",
      "Computer Vision",
      "CIFAR-10"
    ],
    githubUrl: "https://github.com/ksuryashrawan1810-gif/CNN-project",
    results: {
      reportedAccuracy: "Not evaluated in repository",
      bestModel: "Architecture Defined (Conv2D + MaxPool + Dropout + Softmax)",
      caveat:
        "In the public repository notebook, the convolutional architecture is implemented, but training execution (model.fit) and evaluation calls remain commented out. Empirical accuracy scores are intentionally not claimed."
    },
    visualType: "cnn-vision"
  },
  {
    id: "loan-approval-prediction",
    title: "Loan Approval Prediction",
    folioNumber: "03",
    categoryId: "ai-ml",
    shortDescription:
      "An end-to-end classification project exploring applicant data, feature analysis, model comparisons, and Random Forest-based loan approval prediction.",
    overview:
      "A complete machine learning workflow analyzing applicant demographics, credit history, and financial metrics to predict loan eligibility, paired with feature significance testing and an interactive Streamlit UI.",
    workflow: [
      "Exploratory data analysis and missing-value imputation across credit histories and income brackets",
      "Categorical encoding and numerical standard scaling across applicant income and requested loan amounts",
      "Statistical feature selection and hypothesis testing using Pearson correlation and Chi-square contingency tests",
      "Cross-model comparative benchmarking across Logistic Regression, SVM, and Random Forest",
      "Hyperparameter optimization for candidate estimators and model selection",
      "Streamlit web interface designed for interactive applicant parameter entry and evaluation"
    ],
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Random Forest",
      "Streamlit",
      "Data Analysis"
    ],
    githubUrl: "https://github.com/ksuryashrawan1810-gif/Loan-Approval",
    results: {
      reportedAccuracy: "92.11%",
      bestModel: "Random Forest Classifier",
      caveat:
        "Reported test accuracy documented in repository README. Note: The Streamlit script references a pre-trained model.pkl file not bundled in the public repo file tree; hosted live demo is not claimed."
    },
    visualType: "analytics-gauge"
  }
];

/**
 * Validation helper: ensures every project references a registered category.
 */
export const validateProjects = (): boolean => {
  const validCategoryIds = new Set(projectCategories.map((c) => c.id));
  for (const project of projectsData) {
    if (!validCategoryIds.has(project.categoryId)) {
      console.warn(
        `Project "${project.id}" references unknown category "${project.categoryId}". Please register it in projectCategories.ts.`
      );
      return false;
    }
  }
  return true;
};
