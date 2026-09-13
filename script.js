/* =========================================================
   AI LEARNING ACADEMY
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   APPLICATION STATE
   ========================================================= */

const STORAGE_KEY = "aiAcademyCompleteState";

let state = {
    completed: [],
    quizScore: 0,
    quizAttempts: 0,
    topicScores: {}
};

const savedState = localStorage.getItem(STORAGE_KEY);

if (savedState) {

    try {

        state = {
            ...state,
            ...JSON.parse(savedState)
        };

    } catch (error) {

        console.log("Could not load saved progress.");

    }
}


/* =========================================================
   SAVE STATE
   ========================================================= */

function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {

        section.classList.remove("active");

    });

    const target = document.getElementById(sectionId);

    if (target) {

        target.classList.add("active");

    }

    document.querySelector(".nav")?.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (sectionId === "dashboard") {

        updateDashboard();

    }

    if (sectionId === "quiz") {

        startQuiz();

    }

    if (sectionId === "deep-learning") {

        renderDLUnit(currentDLUnit);

    }

}


function toggleMenu() {

    document
        .getElementById("mainNav")
        .classList.toggle("open");

}


/* =========================================================
   THEME
   ========================================================= */

function toggleTheme() {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");

    localStorage.setItem(
        "aiAcademyTheme",
        isLight ? "light" : "dark"
    );

    const button =
        document.querySelector(".icon-btn");

    if (button) {

        button.textContent =
            isLight ? "☀️" : "🌙";

    }

}


function loadTheme() {

    const theme =
        localStorage.getItem("aiAcademyTheme");

    if (theme === "light") {

        document.body.classList.add("light-theme");

        const button =
            document.querySelector(".icon-btn");

        if (button) {

            button.textContent = "☀️";

        }

    }

}


/* =========================================================
   CURRICULUM
   ========================================================= */

const lessons = [

    {
        id: "ai-basics",
        area: "AI",
        level: "Beginner",
        icon: "🤖",
        title: "What is Artificial Intelligence?",
        summary: "Understand AI, its goals, types and applications.",
        definition:
            "Artificial Intelligence is the field of building systems that can perform tasks that normally require intelligent decision making.",
        why:
            "AI is used in recommendation systems, robotics, healthcare, finance, education, search and many other applications.",
        working:
            "An AI system receives information, processes it using rules or learned patterns and produces an output or action.",
        formula: "AI System = Input → Processing / Reasoning → Output",
        animation: [
            "Input",
            "Data",
            "AI Model",
            "Decision",
            "Output"
        ],
        example:
            "A spam filter receives an email and predicts whether it is spam or not spam.",
        points: [
            "AI is the broad field.",
            "Machine Learning is a major approach to AI.",
            "Deep Learning is a subset of Machine Learning.",
            "AI systems can learn, reason, plan or perceive."
        ],
        exam:
            "Define Artificial Intelligence and explain its applications.",
        quiz: {
            question: "Which statement is correct?",
            options: [
                "AI is only robotics",
                "AI is a broad field of intelligent systems",
                "AI is only neural networks",
                "AI is only programming"
            ],
            answer: 1
        }
    },


    {
        id: "ai-ml-dl",
        area: "AI",
        level: "Beginner",
        icon: "🧠",
        title: "AI vs ML vs Deep Learning",
        summary: "Understand the relationship between AI, ML and DL.",
        definition:
            "AI is the broad concept. Machine Learning allows systems to learn patterns from data. Deep Learning uses multi-layer neural networks.",
        why:
            "Understanding the relationship prevents confusion when studying AI technologies.",
        working:
            "AI contains many approaches. Machine Learning is one approach, and Deep Learning is a specialized ML approach.",
        formula:
            "Deep Learning ⊂ Machine Learning ⊂ Artificial Intelligence",
        animation: [
            "AI",
            "Machine Learning",
            "Deep Learning",
            "Neural Networks"
        ],
        example:
            "Image recognition can use a deep neural network trained on many images.",
        points: [
            "AI is the umbrella term.",
            "ML learns patterns from data.",
            "DL uses deep neural networks."
        ],
        exam:
            "Differentiate Artificial Intelligence, Machine Learning and Deep Learning.",
        quiz: {
            question: "Which is a subset of Machine Learning?",
            options: [
                "Deep Learning",
                "Internet",
                "Operating System",
                "Database"
            ],
            answer: 0
        }
    },


    {
        id: "vectors",
        area: "Mathematics",
        level: "Beginner",
        icon: "📐",
        title: "Vectors and Matrices",
        summary: "Learn the mathematical structures used by AI models.",
        definition:
            "A vector is an ordered collection of numbers. A matrix is a rectangular arrangement of numbers.",
        why:
            "Machine Learning models represent data and parameters using vectors and matrices.",
        working:
            "Inputs are represented as vectors and transformations are commonly represented using matrix multiplication.",
        formula:
            "y = Wx + b",
        animation: [
            "Data",
            "Vector",
            "Matrix",
            "Transformation",
            "Result"
        ],
        example:
            "A student's marks in five subjects can be represented as a five-dimensional vector.",
        points: [
            "Vector represents a point or features.",
            "Matrix stores multiple vectors.",
            "Matrix multiplication is fundamental in neural networks."
        ],
        exam:
            "Explain vectors and matrices with AI applications.",
        quiz: {
            question: "What is commonly used to represent multiple feature vectors?",
            options: [
                "Matrix",
                "Single character",
                "Boolean only",
                "Image file only"
            ],
            answer: 0
        }
    },


    {
        id: "probability",
        area: "Mathematics",
        level: "Beginner",
        icon: "🎲",
        title: "Probability for AI",
        summary: "Understand probability, conditional probability and Bayes theorem.",
        definition:
            "Probability measures how likely an event is to occur.",
        why:
            "AI models often work with uncertainty and probabilities.",
        working:
            "A model estimates probabilities and uses them to make predictions.",
        formula:
            "P(A|B) = P(B|A)P(A) / P(B)",
        animation: [
            "Evidence",
            "Prior",
            "Likelihood",
            "Bayes",
            "Posterior"
        ],
        example:
            "A medical classifier can estimate the probability of a condition based on observed features.",
        points: [
            "Probability lies between 0 and 1.",
            "Conditional probability considers additional information.",
            "Bayes theorem updates beliefs using evidence."
        ],
        exam:
            "Explain Bayes theorem and its use in AI.",
        quiz: {
            question: "What does P(A|B) represent?",
            options: [
                "A and B always happen",
                "Probability of A given B",
                "Probability of B only",
                "Probability of neither"
            ],
            answer: 1
        }
    },


    {
        id: "python-basics",
        area: "Python",
        level: "Beginner",
        icon: "🐍",
        title: "Python for AI",
        summary: "Learn Python fundamentals required for AI.",
        definition:
            "Python is a widely used programming language for AI and Machine Learning.",
        why:
            "Python provides a large ecosystem of libraries for numerical computing, data analysis and ML.",
        working:
            "Python programs use variables, conditions, loops, functions, collections and libraries.",
        formula:
            "Program = Input + Processing + Output",
        animation: [
            "Code",
            "Execute",
            "Process",
            "Result"
        ],
        example:
            "NumPy can represent numerical data as arrays and perform mathematical operations efficiently.",
        points: [
            "Learn variables.",
            "Learn if/else.",
            "Learn loops.",
            "Learn functions.",
            "Learn NumPy, Pandas and Matplotlib."
        ],
        exam:
            "Explain why Python is popular for AI development.",
        quiz: {
            question: "Which library is mainly used for numerical arrays?",
            options: [
                "NumPy",
                "HTML",
                "CSS",
                "Git"
            ],
            answer: 0
        }
    },


    {
        id: "data-preprocessing",
        area: "Data",
        level: "Beginner",
        icon: "🗃️",
        title: "Data Preprocessing",
        summary: "Prepare raw data before training a model.",
        definition:
            "Data preprocessing converts raw data into a useful format for Machine Learning.",
        why:
            "Poor-quality data can produce poor models.",
        working:
            "Typical steps include cleaning, handling missing values, encoding, scaling and splitting.",
        formula:
            "Raw Data → Clean → Transform → Split → Model",
        animation: [
            "Raw Data",
            "Cleaning",
            "Encoding",
            "Scaling",
            "Training Data"
        ],
        example:
            "Convert a categorical feature such as city into numerical representation.",
        points: [
            "Handle missing values.",
            "Detect outliers.",
            "Encode categories.",
            "Scale numerical features.",
            "Avoid data leakage."
        ],
        exam:
            "Explain the major steps of data preprocessing.",
        quiz: {
            question: "Why is data preprocessing important?",
            options: [
                "To improve data suitability for learning",
                "To remove the model",
                "To stop training",
                "To delete all data"
            ],
            answer: 0
        }
    },


    {
        id: "supervised-learning",
        area: "Machine Learning",
        level: "Beginner",
        icon: "🎯",
        title: "Supervised Learning",
        summary: "Learn regression and classification using labeled data.",
        definition:
            "Supervised learning learns a mapping from inputs to known target outputs.",
        why:
            "It is widely used for prediction and classification.",
        working:
            "The model receives training examples containing inputs and corresponding labels.",
        formula:
            "Model: X → y",
        animation: [
            "Features",
            "Labeled Data",
            "Training",
            "Model",
            "Prediction"
        ],
        example:
            "Predict whether an email is spam using labeled training emails.",
        points: [
            "Uses labeled data.",
            "Includes classification.",
            "Includes regression."
        ],
        exam:
            "Explain supervised learning with examples.",
        quiz: {
            question: "What does supervised learning require?",
            options: [
                "Labeled training data",
                "No data",
                "Only images",
                "Only text"
            ],
            answer: 0
        }
    },


    {
        id: "linear-regression",
        area: "Machine Learning",
        level: "Beginner",
        icon: "📈",
        title: "Linear Regression",
        summary: "Predict continuous values using a linear relationship.",
        definition:
            "Linear regression models a target as a weighted combination of input features.",
        why:
            "It is one of the simplest and most important regression algorithms.",
        working:
            "The model chooses parameters that minimize prediction error.",
        formula:
            "ŷ = w₀ + w₁x",
        animation: [
            "Data Points",
            "Line",
            "Prediction Error",
            "Update",
            "Better Line"
        ],
        example:
            "Predict house price using area.",
        points: [
            "Used for continuous targets.",
            "Common loss: Mean Squared Error.",
            "Can be trained using gradient descent."
        ],
        exam:
            "Explain linear regression and its cost function.",
        quiz: {
            question: "Linear regression predicts mainly:",
            options: [
                "Continuous values",
                "Only categories",
                "Images",
                "Clusters"
            ],
            answer: 0
        }
    },


    {
        id: "logistic-regression",
        area: "Machine Learning",
        level: "Beginner",
        icon: "🔐",
        title: "Logistic Regression",
        summary: "Learn binary classification using probabilities.",
        definition:
            "Logistic regression predicts the probability of a class using a sigmoid function.",
        why:
            "It is simple, interpretable and useful for binary classification.",
        working:
            "A weighted sum is passed through the sigmoid function.",
        formula:
            "σ(z) = 1 / (1 + e⁻ᶻ)",
        animation: [
            "Features",
            "Weighted Sum",
            "Sigmoid",
            "Probability",
            "Class"
        ],
        example:
            "Predict whether a student passes or fails.",
        points: [
            "Used for classification.",
            "Output can be interpreted as probability.",
            "Sigmoid maps values between 0 and 1."
        ],
        exam:
            "Explain logistic regression and sigmoid function.",
        quiz: {
            question: "Which activation is commonly associated with logistic regression?",
            options: [
                "Sigmoid",
                "ReLU only",
                "Softmax only",
                "Linear only"
            ],
            answer: 0
        }
    },


    {
        id: "knn",
        area: "Machine Learning",
        level: "Beginner",
        icon: "📍",
        title: "K-Nearest Neighbors",
        summary: "Classify using nearby training examples.",
        definition:
            "KNN predicts using the labels of nearby data points.",
        why:
            "It is simple and useful for understanding instance-based learning.",
        working:
            "Calculate distances, select K nearest points and use voting or averaging.",
        formula:
            "Euclidean distance = √Σ(xᵢ-yᵢ)²",
        animation: [
            "New Point",
            "Calculate Distance",
            "Nearest K",
            "Vote",
            "Prediction"
        ],
        example:
            "Classify a new flower based on nearby flowers.",
        points: [
            "K controls number of neighbors.",
            "Distance metric is important.",
            "Feature scaling can be important."
        ],
        exam:
            "Explain KNN algorithm.",
        quiz: {
            question: "What does K represent in KNN?",
            options: [
                "Number of neighbors",
                "Number of classes only",
                "Number of features only",
                "Learning rate"
            ],
            answer: 0
        }
    },


    {
        id: "decision-tree",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🌳",
        title: "Decision Trees",
        summary: "Learn tree-based classification and regression.",
        definition:
            "A decision tree recursively splits data using feature-based decisions.",
        why:
            "Trees are easy to interpret and can model nonlinear relationships.",
        working:
            "Choose a useful split, divide the data and recursively create child nodes.",
        formula:
            "Entropy = -Σ pᵢ log₂(pᵢ)",
        animation: [
            "Dataset",
            "Best Split",
            "Branches",
            "More Splits",
            "Prediction"
        ],
        example:
            "Predict whether a customer will buy a product.",
        points: [
            "Root node contains initial data.",
            "Internal nodes represent decisions.",
            "Leaves represent predictions.",
            "Trees can overfit."
        ],
        exam:
            "Explain decision tree construction and entropy.",
        quiz: {
            question: "What is a leaf node?",
            options: [
                "Final prediction node",
                "Root only",
                "Dataset",
                "Learning rate"
            ],
            answer: 0
        }
    },


    {
        id: "random-forest",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🌲",
        title: "Random Forest",
        summary: "Combine multiple decision trees.",
        definition:
            "Random Forest is an ensemble method that combines predictions from multiple decision trees.",
        why:
            "Combining trees generally improves robustness and reduces overfitting compared with a single tree.",
        working:
            "Multiple trees are trained using random samples/features and their predictions are combined.",
        formula:
            "Prediction = Majority Vote / Average",
        animation: [
            "Dataset",
            "Tree 1",
            "Tree 2",
            "Tree 3",
            "Combined Prediction"
        ],
        example:
            "Classify whether a loan application should be approved.",
        points: [
            "Ensemble learning method.",
            "Uses many trees.",
            "Can provide feature importance."
        ],
        exam:
            "Explain Random Forest and its advantages.",
        quiz: {
            question: "Random Forest combines:",
            options: [
                "Multiple decision trees",
                "Only one neuron",
                "Only clusters",
                "Only linear equations"
            ],
            answer: 0
        }
    },


    {
        id: "svm",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "↔️",
        title: "Support Vector Machine",
        summary: "Understand maximum-margin classification.",
        definition:
            "SVM finds a decision boundary that maximizes the margin between classes.",
        why:
            "SVM can perform well for high-dimensional datasets.",
        working:
            "The model identifies support vectors and chooses a separating hyperplane.",
        formula:
            "wᵀx + b = 0",
        animation: [
            "Data",
            "Boundary",
            "Support Vectors",
            "Maximum Margin",
            "Classification"
        ],
        example:
            "Separate two classes of data using a maximum-margin hyperplane.",
        points: [
            "Support vectors are important training points.",
            "Margin measures distance from boundary.",
            "Kernel functions allow nonlinear boundaries."
        ],
        exam:
            "Explain SVM and the concept of maximum margin.",
        quiz: {
            question: "What does SVM try to maximize?",
            options: [
                "Margin",
                "Number of features",
                "Dataset size",
                "Learning rate"
            ],
            answer: 0
        }
    },


    {
        id: "kmeans",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🔵",
        title: "K-Means Clustering",
        summary: "Group unlabeled data into clusters.",
        definition:
            "K-Means partitions data into K clusters using centroids.",
        why:
            "It is a fundamental unsupervised learning algorithm.",
        working:
            "Initialize centroids, assign points, update centroids and repeat.",
        formula:
            "Minimize Σ ||xᵢ - μc||²",
        animation: [
            "Points",
            "Centroids",
            "Assign",
            "Update",
            "Repeat"
        ],
        example:
            "Group customers into purchasing behavior segments.",
        points: [
            "K is the number of clusters.",
            "Centroids represent cluster centers.",
            "Algorithm iterates until convergence."
        ],
        exam:
            "Explain K-Means clustering algorithm.",
        quiz: {
            question: "What does K represent in K-Means?",
            options: [
                "Number of clusters",
                "Number of features",
                "Number of epochs",
                "Learning rate"
            ],
            answer: 0
        }
    },


    {
        id: "dbscan",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🟣",
        title: "DBSCAN",
        summary: "Density-based clustering with noise detection.",
        definition:
            "DBSCAN forms clusters based on the density of nearby points.",
        why:
            "Unlike K-Means, DBSCAN can discover irregularly shaped clusters and identify noise.",
        working:
            "Points are classified using neighborhood radius and minimum points.",
        formula:
            "Parameters: ε and MinPts",
        animation: [
            "Points",
            "Neighborhood",
            "Core Point",
            "Cluster",
            "Noise"
        ],
        example:
            "Detect groups of geographically close locations.",
        points: [
            "Uses ε neighborhood.",
            "Uses minimum number of points.",
            "Can identify noise."
        ],
        exam:
            "Compare K-Means and DBSCAN.",
        quiz: {
            question: "DBSCAN is based mainly on:",
            options: [
                "Density",
                "Gradient only",
                "Trees",
                "Neural gates"
            ],
            answer: 0
        }
    },


    {
        id: "pca",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "📉",
        title: "PCA",
        summary: "Reduce dimensionality while preserving important variation.",
        definition:
            "Principal Component Analysis transforms features into new orthogonal directions called principal components.",
        why:
            "PCA can reduce dimensionality, visualization complexity and redundancy.",
        working:
            "Center data, calculate covariance, find eigenvectors and select components.",
        formula:
            "Cov(X) = E[(X-μ)(X-μ)ᵀ]",
        animation: [
            "Data",
            "Center",
            "Directions",
            "Principal Components",
            "Reduced Data"
        ],
        example:
            "Reduce 20 features to 2 components for visualization.",
        points: [
            "Principal components are orthogonal.",
            "First component captures maximum variance.",
            "Explained variance helps select components."
        ],
        exam:
            "Explain PCA and principal components.",
        quiz: {
            question: "PCA is mainly used for:",
            options: [
                "Dimensionality reduction",
                "Database creation",
                "Web design",
                "Sorting"
            ],
            answer: 0
        }
    },


    {
        id: "feature-engineering",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🛠️",
        title: "Feature Engineering",
        summary: "Create useful input features for Machine Learning.",
        definition:
            "Feature engineering transforms raw information into features that help a model learn.",
        why:
            "Good features can significantly improve model performance.",
        working:
            "Features can be created, transformed, selected or combined using domain knowledge.",
        formula:
            "Useful Features → Better Representation → Better Learning",
        animation: [
            "Raw Data",
            "Transform",
            "New Feature",
            "Model",
            "Improved Prediction"
        ],
        example:
            "Convert date into day, month, weekday and season features.",
        points: [
            "Feature creation.",
            "Feature transformation.",
            "Feature selection."
        ],
        exam:
            "Explain feature engineering and its importance.",
        quiz: {
            question: "What is feature engineering?",
            options: [
                "Creating useful features from raw data",
                "Deleting the dataset",
                "Writing HTML",
                "Installing an operating system"
            ],
            answer: 0
        }
    },


    {
        id: "model-evaluation",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "📊",
        title: "Model Evaluation",
        summary: "Measure how well a Machine Learning model performs.",
        definition:
            "Model evaluation uses suitable metrics to measure predictive performance.",
        why:
            "A model must be evaluated on data that represents how it will be used.",
        working:
            "Split data into training/testing sets and calculate suitable evaluation metrics.",
        formula:
            "Accuracy = Correct Predictions / Total Predictions",
        animation: [
            "Test Data",
            "Prediction",
            "Compare",
            "Metric",
            "Score"
        ],
        example:
            "Evaluate a spam classifier using accuracy, precision and recall.",
        points: [
            "Accuracy.",
            "Precision.",
            "Recall.",
            "F1-score.",
            "Confusion matrix."
        ],
        exam:
            "Explain common classification evaluation metrics.",
        quiz: {
            question: "Which metric is useful when false negatives are important?",
            options: [
                "Recall",
                "File size",
                "RAM",
                "Clock speed"
            ],
            answer: 0
        }
    },


    {
        id: "gradient-descent",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "⛰️",
        title: "Gradient Descent",
        summary: "Understand the optimization method used to train many models.",
        definition:
            "Gradient descent is an optimization algorithm that updates parameters in the direction that reduces a loss function.",
        why:
            "Many Machine Learning and Deep Learning models require optimization to learn parameters.",
        working:
            "Calculate the gradient of the loss and update parameters repeatedly.",
        formula:
            "θnew = θold - η∇J(θ)",
        animation: [
            "Start",
            "Calculate Loss",
            "Gradient",
            "Update",
            "Minimum"
        ],
        example:
            "A neural network adjusts its weights to reduce training loss.",
        points: [
            "Learning rate controls update size.",
            "Gradient shows direction of increase.",
            "Parameters move toward lower loss."
        ],
        exam:
            "Explain gradient descent with the parameter update equation.",
        quiz: {
            question: "What does η usually represent?",
            options: [
                "Learning rate",
                "Accuracy",
                "Number of classes",
                "Dataset size"
            ],
            answer: 0
        }
    },


    {
        id: "overfitting",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "⚖️",
        title: "Overfitting and Underfitting",
        summary: "Understand bias, variance and model generalization.",
        definition:
            "Overfitting occurs when a model learns training data too closely and performs poorly on unseen data.",
        why:
            "The goal of Machine Learning is good generalization, not merely high training accuracy.",
        working:
            "Compare training and validation performance to identify generalization problems.",
        formula:
            "Good Model → Low Generalization Error",
        animation: [
            "Training Data",
            "Simple Model",
            "Complex Model",
            "Validation",
            "Generalization"
        ],
        example:
            "A very deep decision tree may memorize training examples.",
        points: [
            "Overfitting means high training performance but poor unseen-data performance.",
            "Underfitting means the model is too simple.",
            "Regularization can help reduce overfitting."
        ],
        exam:
            "Differentiate overfitting and underfitting.",
        quiz: {
            question: "Which situation indicates overfitting?",
            options: [
                "High training performance and poor test performance",
                "Poor training and poor test performance",
                "No training data",
                "No model"
            ],
            answer: 0
        }
    },


    {
        id: "cross-validation",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🔄",
        title: "Cross Validation",
        summary: "Learn how to estimate model performance more reliably.",
        definition:
            "Cross-validation repeatedly divides data into training and validation portions to estimate generalization performance.",
        why:
            "A single train-test split may give a noisy estimate of performance.",
        working:
            "In K-fold cross-validation, data is divided into K folds and each fold is used as validation once.",
        formula:
            "Average CV Score = Σ Fold Scores / K",
        animation: [
            "Dataset",
            "Fold 1",
            "Fold 2",
            "Fold 3",
            "Average Score"
        ],
        example:
            "Use 5-fold cross-validation to compare two classification models.",
        points: [
            "K-fold is commonly used.",
            "Every fold gets a validation turn.",
            "Useful for model comparison and tuning."
        ],
        exam:
            "Explain K-fold cross-validation.",
        quiz: {
            question: "In K-fold cross-validation, how many validation rounds are performed?",
            options: [
                "K",
                "1 always",
                "0",
                "2K only"
            ],
            answer: 0
        }
    },


    {
        id: "regularization",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "🛡️",
        title: "Regularization",
        summary: "Reduce overfitting by controlling model complexity.",
        definition:
            "Regularization adds a penalty to the objective function to discourage overly complex models.",
        why:
            "It can improve generalization by preventing excessively large or complex parameters.",
        working:
            "The training objective combines prediction loss with a regularization penalty.",
        formula:
            "Objective = Loss + λ Penalty",
        animation: [
            "Model",
            "Loss",
            "Penalty",
            "Optimization",
            "Generalization"
        ],
        example:
            "L2 regularization discourages very large weights.",
        points: [
            "L1 regularization can encourage sparse coefficients.",
            "L2 regularization penalizes squared weights.",
            "λ controls regularization strength."
        ],
        exam:
            "Explain L1 and L2 regularization.",
        quiz: {
            question: "What is the main purpose of regularization?",
            options: [
                "Reduce overfitting",
                "Increase file size",
                "Delete labels",
                "Remove all features"
            ],
            answer: 0
        }
    },


    {
        id: "neural-network",
        area: "Deep Learning",
        level: "Beginner",
        icon: "🧬",
        title: "Neural Networks",
        summary: "Understand neurons, layers, weights and activation functions.",
        definition:
            "A neural network is a model made of interconnected computational units arranged in layers.",
        why:
            "Neural networks form the foundation of modern Deep Learning.",
        working:
            "Inputs are multiplied by weights, combined with bias and passed through activation functions.",
        formula:
            "z = Wx + b",
        animation: [
            "Input",
            "Weights",
            "Neuron",
            "Activation",
            "Output"
        ],
        example:
            "A neural network can classify images into different categories.",
        points: [
            "Input layer receives features.",
            "Hidden layers learn representations.",
            "Output layer produces predictions.",
            "Weights are learned during training."
        ],
        exam:
            "Explain the architecture of an artificial neural network.",
        quiz: {
            question: "What is learned during neural network training?",
            options: [
                "Weights and parameters",
                "HTML tags",
                "File names",
                "Screen resolution"
            ],
            answer: 0
        }
    },


    {
        id: "activation-functions",
        area: "Deep Learning",
        level: "Beginner",
        icon: "⚡",
        title: "Activation Functions",
        summary: "Learn ReLU, Sigmoid, Tanh and Softmax.",
        definition:
            "Activation functions introduce nonlinear transformations into neural networks.",
        why:
            "Without nonlinear activations, stacked linear layers would remain equivalent to a linear transformation.",
        working:
            "The weighted sum entering a neuron is passed through an activation function.",
        formula:
            "a = f(z)",
        animation: [
            "Input",
            "Weighted Sum",
            "Activation",
            "Nonlinearity",
            "Output"
        ],
        example:
            "ReLU is commonly used in hidden layers of neural networks.",
        points: [
            "Sigmoid outputs values between 0 and 1.",
            "Tanh outputs values between -1 and 1.",
            "ReLU outputs max(0,z).",
            "Softmax converts logits into class probabilities."
        ],
        exam:
            "Explain common activation functions used in neural networks.",
        quiz: {
            question: "Which activation is commonly used in hidden layers?",
            options: [
                "ReLU",
                "HTML",
                "SQL",
                "JPEG"
            ],
            answer: 0
        }
    },


    {
        id: "backpropagation",
        area: "Deep Learning",
        level: "Intermediate",
        icon: "🔙",
        title: "Backpropagation",
        summary: "Understand how neural networks calculate gradients.",
        definition:
            "Backpropagation computes gradients of the loss with respect to network parameters using the chain rule.",
        why:
            "It allows neural networks to efficiently learn weights.",
        working:
            "The network performs a forward pass, calculates loss and propagates gradient information backward.",
        formula:
            "Gradient = ∂Loss / ∂Weight",
        animation: [
            "Input",
            "Forward Pass",
            "Loss",
            "Backward Pass",
            "Weight Update"
        ],
        example:
            "A neural network uses backpropagation to adjust weights after making an incorrect prediction.",
        points: [
            "Forward propagation calculates predictions.",
            "Loss measures error.",
            "Backward propagation calculates gradients.",
            "Optimizer updates weights."
        ],
        exam:
            "Explain backpropagation algorithm.",
        quiz: {
            question: "Backpropagation mainly calculates:",
            options: [
                "Gradients",
                "HTML pages",
                "Database tables",
                "Screen pixels"
            ],
            answer: 0
        }
    },


    {
        id: "cnn",
        area: "Deep Learning",
        level: "Intermediate",
        icon: "👁️",
        title: "Convolutional Neural Networks",
        summary: "Learn CNNs for image and spatial data.",
        definition:
            "A CNN is a neural network architecture designed to learn spatial features using convolution operations.",
        why:
            "CNNs are highly useful for image classification, object detection and computer vision.",
        working:
            "Convolution filters scan an input to extract local patterns such as edges and textures.",
        formula:
            "Feature Map = Input * Kernel",
        animation: [
            "Image",
            "Kernel",
            "Convolution",
            "Feature Map",
            "Prediction"
        ],
        example:
            "A CNN can recognize whether an image contains a cat or dog.",
        points: [
            "Convolution extracts features.",
            "Pooling can reduce spatial dimensions.",
            "Multiple layers learn increasingly complex patterns."
        ],
        exam:
            "Explain CNN architecture and convolution operation.",
        quiz: {
            question: "CNNs are especially useful for:",
            options: [
                "Images",
                "Only spreadsheets",
                "Only databases",
                "Only text files"
            ],
            answer: 0
        }
    },


    {
        id: "rnn",
        area: "Deep Learning",
        level: "Intermediate",
        icon: "🔁",
        title: "Recurrent Neural Networks",
        summary: "Understand neural networks for sequential data.",
        definition:
            "RNNs process sequences while maintaining a hidden state that carries information from previous steps.",
        why:
            "They are useful for sequence data such as time series and text.",
        working:
            "At each time step, the network combines the current input with information from the previous hidden state.",
        formula:
            "hₜ = f(Wxₜ + Uhₜ₋₁ + b)",
        animation: [
            "Input₁",
            "Hidden State",
            "Input₂",
            "Hidden State",
            "Output"
        ],
        example:
            "An RNN can process a sequence of words in a sentence.",
        points: [
            "RNNs maintain hidden state.",
            "They process sequential information.",
            "Basic RNNs can suffer from vanishing gradients."
        ],
        exam:
            "Explain the working of a recurrent neural network.",
        quiz: {
            question: "RNNs are designed mainly for:",
            options: [
                "Sequential data",
                "Only images",
                "Only databases",
                "Only HTML"
            ],
            answer: 0
        }
    },


    {
        id: "lstm",
        area: "Deep Learning",
        level: "Intermediate",
        icon: "🧠",
        title: "LSTM",
        summary: "Learn Long Short-Term Memory networks.",
        definition:
            "LSTM is a recurrent architecture designed to better preserve information over long sequences.",
        why:
            "LSTM networks can handle long-term dependencies more effectively than basic RNNs.",
        working:
            "LSTM uses gates to control what information is remembered, forgotten and exposed.",
        formula:
            "Cell State + Input Gate + Forget Gate + Output Gate",
        animation: [
            "Input",
            "Forget Gate",
            "Input Gate",
            "Cell State",
            "Output Gate"
        ],
        example:
            "LSTMs can be used for time-series forecasting or sequence classification.",
        points: [
            "Forget gate controls removal of information.",
            "Input gate controls new information.",
            "Output gate controls exposed information."
        ],
        exam:
            "Explain LSTM architecture and its gates.",
        quiz: {
            question: "Which is an LSTM gate?",
            options: [
                "Forget gate",
                "HTML gate",
                "Database gate",
                "CSS gate"
            ],
            answer: 0
        }
    },


    {
        id: "transformers",
        area: "Generative AI",
        level: "Advanced",
        icon: "🤯",
        title: "Transformers",
        summary: "Understand attention and transformer architecture.",
        definition:
            "Transformers are neural network architectures that use attention mechanisms to model relationships between elements in a sequence.",
        why:
            "Transformers power many modern language, vision and multimodal models.",
        working:
            "Attention computes relationships between tokens and creates contextual representations.",
        formula:
            "Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V",
        animation: [
            "Tokens",
            "Queries",
            "Keys",
            "Values",
            "Attention"
        ],
        example:
            "A transformer language model uses attention to understand relationships between words.",
        points: [
            "Self-attention is central.",
            "Transformers can process sequence elements in parallel during training.",
            "Encoder and decoder architectures are common."
        ],
        exam:
            "Explain self-attention and transformer architecture.",
        quiz: {
            question: "What is central to the Transformer architecture?",
            options: [
                "Attention",
                "Sorting",
                "File compression",
                "Database indexing"
            ],
            answer: 0
        }
    },


    {
        id: "nlp",
        area: "AI",
        level: "Intermediate",
        icon: "💬",
        title: "Natural Language Processing",
        summary: "Learn how AI processes human language.",
        definition:
            "NLP is the field of AI concerned with processing and understanding human language.",
        why:
            "NLP powers chatbots, translation, search, summarization and sentiment analysis.",
        working:
            "Text is transformed into representations that models can use for prediction or generation.",
        formula:
            "Text → Tokens → Representation → Model → Output",
        animation: [
            "Text",
            "Tokenization",
            "Embedding",
            "Model",
            "Response"
        ],
        example:
            "A chatbot processes a user's message and generates a response.",
        points: [
            "Tokenization breaks text into units.",
            "Embeddings represent tokens numerically.",
            "Language models learn patterns in text."
        ],
        exam:
            "Explain the major stages of Natural Language Processing.",
        quiz: {
            question: "NLP deals mainly with:",
            options: [
                "Human language",
                "Only hardware",
                "Only databases",
                "Only networking cables"
            ],
            answer: 0
        }
    },


    {
        id: "computer-vision",
        area: "AI",
        level: "Intermediate",
        icon: "📷",
        title: "Computer Vision",
        summary: "Learn how AI understands images and video.",
        definition:
            "Computer Vision is the field of AI that enables computers to analyze visual information.",
        why:
            "It is used in medical imaging, autonomous systems, security, manufacturing and many other applications.",
        working:
            "Images are represented numerically and processed using algorithms or neural networks.",
        formula:
            "Image → Features → Model → Visual Prediction",
        animation: [
            "Image",
            "Pixels",
            "Features",
            "Model",
            "Prediction"
        ],
        example:
            "Object detection identifies vehicles and pedestrians in an image.",
        points: [
            "Image classification assigns a class.",
            "Object detection identifies objects and locations.",
            "Segmentation assigns labels to pixels."
        ],
        exam:
            "Explain major Computer Vision tasks.",
        quiz: {
            question: "Which is a Computer Vision task?",
            options: [
                "Object detection",
                "Database normalization",
                "Network routing",
                "Sorting numbers"
            ],
            answer: 0
        }
    },


    {
        id: "reinforcement-learning",
        area: "AI",
        level: "Advanced",
        icon: "🎮",
        title: "Reinforcement Learning",
        summary: "Learn agents, actions, rewards and policies.",
        definition:
            "Reinforcement Learning is a learning paradigm in which an agent interacts with an environment and learns from rewards.",
        why:
            "RL is useful for sequential decision-making problems.",
        working:
            "The agent observes a state, selects an action, receives a reward and updates its policy or value estimates.",
        formula:
            "State → Action → Reward → Next State",
        animation: [
            "State",
            "Action",
            "Environment",
            "Reward",
            "Learning"
        ],
        example:
            "An agent learns to navigate a game environment by receiving rewards.",
        points: [
            "Agent interacts with environment.",
            "Actions affect future states.",
            "Reward guides learning.",
            "Exploration and exploitation are important."
        ],
        exam:
            "Explain the basic components of Reinforcement Learning.",
        quiz: {
            question: "What guides learning in Reinforcement Learning?",
            options: [
                "Rewards",
                "Only labels",
                "Only matrices",
                "Only HTML"
            ],
            answer: 0
        }
    },


    {
        id: "generative-ai",
        area: "Generative AI",
        level: "Advanced",
        icon: "✨",
        title: "Generative AI",
        summary: "Understand models that generate new content.",
        definition:
            "Generative AI refers to models that learn patterns in data and generate new content such as text, images, audio or code.",
        why:
            "Generative AI is used in assistants, content creation, coding tools and creative applications.",
        working:
            "A generative model learns a data distribution and produces new samples based on learned patterns and input conditions.",
        formula:
            "Prompt → Model → Generated Output",
        animation: [
            "Prompt",
            "Representation",
            "Model",
            "Generation",
            "Output"
        ],
        example:
            "A language model can generate an explanation from a user's question.",
        points: [
            "Can generate text, images, audio or code.",
            "Large language models are a major generative AI technology.",
            "Prompting affects model output."
        ],
        exam:
            "Explain Generative AI with applications.",
        quiz: {
            question: "What can Generative AI produce?",
            options: [
                "New content",
                "Only databases",
                "Only network packets",
                "Only spreadsheets"
            ],
            answer: 0
        }
    },


    {
        id: "llm",
        area: "Generative AI",
        level: "Advanced",
        icon: "🗣️",
        title: "Large Language Models",
        summary: "Learn tokens, embeddings, attention and language-model training.",
        definition:
            "Large Language Models are neural language models trained on large collections of text to learn language patterns.",
        why:
            "LLMs support text generation, question answering, summarization, coding and many other language tasks.",
        working:
            "Text is tokenized, transformed into representations and processed through neural network layers to predict or generate tokens.",
        formula:
            "Context → Token Probabilities → Next Token",
        animation: [
            "Text",
            "Tokens",
            "Embeddings",
            "Transformer",
            "Next Token"
        ],
        example:
            "A language model predicts the next token based on previous context.",
        points: [
            "Tokens are model input units.",
            "Embeddings provide numerical representations.",
            "Transformers are commonly used.",
            "Generation is usually autoregressive for decoder-only models."
        ],
        exam:
            "Explain the basic working of Large Language Models.",
        quiz: {
            question: "LLMs commonly operate on:",
            options: [
                "Tokens",
                "Only pixels",
                "Only IP addresses",
                "Only database rows"
            ],
            answer: 0
        }
    },


    {
        id: "ai-agents",
        area: "AI",
        level: "Advanced",
        icon: "🧩",
        title: "AI Agents",
        summary: "Learn agents that perceive, reason, plan and act.",
        definition:
            "An AI agent is a system that observes its environment, reasons about goals and performs actions.",
        why:
            "Agentic systems can solve multi-step tasks by combining reasoning, tools, memory and planning.",
        working:
            "A typical agent loop is observe → reason → plan → act → observe again.",
        formula:
            "Observe → Think → Plan → Act → Feedback",
        animation: [
            "Observe",
            "Reason",
            "Plan",
            "Act",
            "Feedback"
        ],
        example:
            "An intelligent navigation agent can evaluate possible paths and select actions to reach a destination.",
        points: [
            "Agents interact with environments.",
            "Planning supports multi-step tasks.",
            "Tools allow agents to perform actions.",
            "Feedback helps improve decisions."
        ],
        exam:
            "Explain the architecture and working of an intelligent agent.",
        quiz: {
            question: "What is a key characteristic of an AI agent?",
            options: [
                "It can perceive and act toward goals",
                "It only stores files",
                "It only displays images",
                "It only performs arithmetic"
            ],
            answer: 0
        }
    },


    {
        id: "mlops",
        area: "AI",
        level: "Advanced",
        icon: "🚀",
        title: "MLOps and Model Deployment",
        summary: "Learn how Machine Learning models move from development to production.",
        definition:
            "MLOps combines Machine Learning development with software engineering and operational practices.",
        why:
            "A trained model must be deployed, monitored, updated and maintained to be useful in real applications.",
        working:
            "Typical workflow includes data preparation, training, validation, deployment, monitoring and retraining.",
        formula:
            "Data → Train → Validate → Deploy → Monitor → Retrain",
        animation: [
            "Data",
            "Training",
            "Validation",
            "Deployment",
            "Monitoring"
        ],
        example:
            "A fraud detection model is deployed as an API and monitored for performance.",
        points: [
            "Version datasets and models.",
            "Automate training and deployment where appropriate.",
            "Monitor model performance and data drift.",
            "Retrain when necessary."
        ],
        exam:
            "Explain the Machine Learning lifecycle and MLOps.",
        quiz: {
            question: "What is an important MLOps activity after deployment?",
            options: [
                "Monitoring",
                "Deleting the model",
                "Removing all data",
                "Stopping evaluation"
            ],
            answer: 0
        }
    }

];