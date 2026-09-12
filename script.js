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
            "Feature selection.",
            "Avoid leakage."
        ],
        exam:
            "Explain feature engineering with examples.",
        quiz: {
            question: "Feature engineering creates:",
            options: [
                "Useful model inputs",
                "Operating systems",
                "Web pages",
                "Databases only"
            ],
            answer: 0
        }
    },


    {
        id: "ensemble",
        area: "Machine Learning",
        level: "Intermediate",
        icon: "👥",
        title: "Ensemble Learning",
        summary: "Combine multiple models to improve predictions.",
        definition:
            "Ensemble learning combines multiple models to produce a stronger predictor.",
        why:
            "Different models can complement each other's errors.",
        working:
            "Models are trained separately or sequentially and their predictions are combined.",
        formula:
            "Ensemble = Combine Multiple Learners",
        animation: [
            "Model A",
            "Model B",
            "Model C",
            "Combine",
            "Final Prediction"
        ],
        example:
            "Random Forest combines many decision trees.",
        points: [
            "Bagging.",
            "Boosting.",
            "Voting.",
            "Stacking."
        ],
        exam:
            "Explain ensemble learning.",
        quiz: {
            question: "Random Forest is an example of:",
            options: [
                "Ensemble learning",
                "Dimensionality reduction",
                "Clustering only",
                "Regression only"
            ],
            answer: 0
        }
    },


    {
        id: "neural-network",
        area: "Deep Learning",
        level: "Beginner",
        icon: "🧠",
        title: "Neural Networks",
        summary: "Understand artificial neurons and network architecture.",
        definition:
            "A neural network is a computational model made from interconnected artificial neurons.",
        why:
            "Neural networks are the foundation of modern Deep Learning.",
        working:
            "Inputs are multiplied by weights, combined with bias and passed through an activation function.",
        formula:
            "z = Σwᵢxᵢ + b",
        animation: [
            "Inputs",
            "Weights",
            "Weighted Sum",
            "Activation",
            "Output"
        ],
        example:
            "A neuron can combine several features to produce a prediction signal.",
        points: [
            "Weights control importance.",
            "Bias shifts activation.",
            "Activation functions add nonlinear behavior."
        ],
        exam:
            "Explain the working of an artificial neuron.",
        quiz: {
            question: "What is the basic computational unit of a neural network?",
            options: [
                "Neuron",
                "Database",
                "Cluster",
                "Tree"
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
        summary: "Learn how neural networks calculate gradients.",
        definition:
            "Backpropagation efficiently computes gradients of the loss with respect to model parameters.",
        why:
            "These gradients allow neural networks to update weights during training.",
        working:
            "The network performs a forward pass, calculates loss and propagates error information backward.",
        formula:
            "w ← w - η ∂L/∂w",
        animation: [
            "Input",
            "Forward Pass",
            "Loss",
            "Backward Pass",
            "Weight Update"
        ],
        example:
            "A neural network compares its prediction with the correct label and updates its weights.",
        points: [
            "Uses chain rule.",
            "Requires a loss function.",
            "Works with gradient-based optimization."
        ],
        exam:
            "Explain the backpropagation algorithm.",
        quiz: {
            question: "Backpropagation calculates:",
            options: [
                "Gradients",
                "Only clusters",
                "HTML",
                "Database tables"
            ],
            answer: 0
        }
    },


    {
        id: "optimizers",
        area: "Deep Learning",
        level: "Intermediate",
        icon: "⚙️",
        title: "Optimization Algorithms",
        summary: "Understand gradient descent, momentum, Adam and related optimizers.",
        definition:
            "Optimization algorithms update model parameters to minimize a loss function.",
        why:
            "Good optimization improves training speed and convergence.",
        working:
            "Calculate gradients and update parameters according to an optimization rule.",
        formula:
            "θ ← θ - η∇θL",
        animation: [
            "Loss",
            "Gradient",
            "Direction",
            "Parameter Update",
            "Lower Loss"
        ],
        example:
            "Adam combines adaptive learning rates with momentum-like estimates.",
        points: [
            "Learning rate is important.",
            "Momentum can accelerate training.",
            "Adam is widely used."
        ],
        exam:
            "Explain gradient descent and Adam optimizer.",
        quiz: {
            question: "What controls the size of an optimization step?",
            options: [
                "Learning rate",
                "Dataset name",
                "File extension",
                "Number of classes only"
            ],
            answer: 0
        }
    },


    {
        id: "cnn",
        area: "Computer Vision",
        level: "Intermediate",
        icon: "🖼️",
        title: "Convolutional Neural Networks",
        summary: "Learn CNNs for image and spatial data.",
        definition:
            "CNNs use convolutional filters to learn spatial patterns from images.",
        why:
            "CNNs are highly effective for image recognition and computer vision.",
        working:
            "Filters slide over input data and produce feature maps, followed by nonlinear and often pooling operations.",
        formula:
            "Feature Map = Input * Kernel",
        animation: [
            "Image",
            "Filter",
            "Convolution",
            "Feature Map",
            "Prediction"
        ],
        example:
            "A CNN can learn edges in early layers and more complex patterns in deeper layers.",
        points: [
            "Kernel/filter.",
            "Stride.",
            "Padding.",
            "Feature maps.",
            "Pooling."
        ],
        exam:
            "Explain CNN architecture and convolution.",
        quiz: {
            question: "CNNs are especially useful for:",
            options: [
                "Images",
                "Only databases",
                "Only sorting",
                "Only networking"
            ],
            answer: 0
        }
    },


    {
        id: "rnn",
        area: "Deep Learning",
        level: "Intermediate",
        icon: "🔄",
        title: "Recurrent Neural Networks",
        summary: "Learn neural networks for sequential data.",
        definition:
            "RNNs process sequences while maintaining a hidden state that carries information from previous steps.",
        why:
            "Sequences such as text and time series contain temporal relationships.",
        working:
            "At each time step, the RNN combines current input with previous hidden state.",
        formula:
            "hₜ = f(Wxₜ + Uhₜ₋₁ + b)",
        animation: [
            "x₁",
            "h₁",
            "x₂",
            "h₂",
            "x₃"
        ],
        example:
            "Predict the next word in a sequence.",
        points: [
            "Uses hidden state.",
            "Processes sequence step by step.",
            "Can suffer from vanishing gradients."
        ],
        exam:
            "Explain RNN architecture and hidden state.",
        quiz: {
            question: "What carries previous information in an RNN?",
            options: [
                "Hidden state",
                "Kernel",
                "Centroid",
                "Decision tree"
            ],
            answer: 0
        }
    },


    {
        id: "lstm",
        area: "Deep Learning",
        level: "Advanced",
        icon: "🧩",
        title: "LSTM",
        summary: "Learn Long Short-Term Memory networks.",
        definition:
            "LSTM is a recurrent architecture designed to better preserve useful information across long sequences.",
        why:
            "LSTMs help address difficulties with long-term dependencies in ordinary RNNs.",
        working:
            "LSTM uses gates to control information entering, leaving and remaining in the cell state.",
        formula:
            "cₜ = fₜ⊙cₜ₋₁ + iₜ⊙ĉₜ",
        animation: [
            "Forget Gate",
            "Input Gate",
            "Cell State",
            "Output Gate",
            "Hidden State"
        ],
        example:
            "LSTMs can be used for time-series forecasting or sequence modeling.",
        points: [
            "Forget gate.",
            "Input gate.",
            "Output gate.",
            "Cell state."
        ],
        exam:
            "Explain LSTM architecture and gates.",
        quiz: {
            question: "Which structure carries long-term information in LSTM?",
            options: [
                "Cell state",
                "Centroid",
                "Kernel",
                "Tree root"
            ],
            answer: 0
        }
    },


    {
        id: "nlp",
        area: "NLP",
        level: "Intermediate",
        icon: "💬",
        title: "Natural Language Processing",
        summary: "Learn how AI processes human language.",
        definition:
            "NLP is the field of AI concerned with understanding and generating human language.",
        why:
            "NLP powers chatbots, translation, search, summarization and sentiment analysis.",
        working:
            "Text is converted into machine-readable representations and processed using statistical or neural models.",
        formula:
            "Text → Tokens → Representation → Model → Output",
        animation: [
            "Sentence",
            "Tokens",
            "Embeddings",
            "Model",
            "Meaning"
        ],
        example:
            "Classify a review as positive or negative.",
        points: [
            "Tokenization.",
            "Embeddings.",
            "Text classification.",
            "Named Entity Recognition."
        ],
        exam:
            "Explain NLP and its applications.",
        quiz: {
            question: "NLP mainly deals with:",
            options: [
                "Human language",
                "Only images",
                "Only hardware",
                "Only databases"
            ],
            answer: 0
        }
    },


    {
        id: "transformers",
        area: "Generative AI",
        level: "Advanced",
        icon: "⚡",
        title: "Transformers and Attention",
        summary: "Understand the architecture behind modern language models.",
        definition:
            "Transformers process sequences using attention mechanisms rather than relying only on recurrence.",
        why:
            "Transformers power many modern NLP and Generative AI systems.",
        working:
            "Attention calculates relationships between tokens and produces context-aware representations.",
        formula:
            "Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V",
        animation: [
            "Tokens",
            "Q K V",
            "Attention Scores",
            "Weighted Values",
            "Context"
        ],
        example:
            "A transformer can determine which words in a sentence are relevant to each other.",
        points: [
            "Self-attention.",
            "Queries.",
            "Keys.",
            "Values.",
            "Positional information."
        ],
        exam:
            "Explain self-attention and Transformer architecture.",
        quiz: {
            question: "Transformers rely heavily on:",
            options: [
                "Attention",
                "K-Means",
                "Decision trees",
                "Linear search"
            ],
            answer: 0
        }
    },


    {
        id: "llm",
        area: "Generative AI",
        level: "Advanced",
        icon: "🪄",
        title: "Large Language Models",
        summary: "Understand LLMs, training, prompting and generation.",
        definition:
            "Large Language Models are neural models trained on large amounts of text to learn language patterns.",
        why:
            "LLMs power modern chatbots, coding assistants and text generation systems.",
        working:
            "A language model learns to predict tokens and can generate sequences based on context.",
        formula:
            "P(x₁,...,xₙ) = ∏ P(xₜ | x₁,...,xₜ₋₁)",
        animation: [
            "Text",
            "Tokens",
            "Transformer",
            "Next Token",
            "Generated Text"
        ],
        example:
            "An LLM generates the next token based on previous context.",
        points: [
            "Tokenization.",
            "Pretraining.",
            "Inference.",
            "Prompting.",
            "Fine-tuning."
        ],
        exam:
            "Explain the basic working of an LLM.",
        quiz: {
            question: "A language model commonly predicts:",
            options: [
                "Next token",
                "Only image pixels",
                "Database rows",
                "CPU temperature"
            ],
            answer: 0
        }
    },


    {
        id: "rag",
        area: "Generative AI",
        level: "Advanced",
        icon: "📚",
        title: "Retrieval-Augmented Generation",
        summary: "Connect generative models to external knowledge.",
        definition:
            "RAG combines information retrieval with text generation.",
        why:
            "It allows a system to retrieve relevant information before generating an answer.",
        working:
            "Documents are indexed, relevant chunks are retrieved and passed to the generation model.",
        formula:
            "Question → Retrieve → Context → Generate",
        animation: [
            "Question",
            "Search",
            "Relevant Chunks",
            "LLM",
            "Answer"
        ],
        example:
            "Build a chatbot that answers questions from college notes.",
        points: [
            "Document chunking.",
            "Embeddings.",
            "Vector search.",
            "Context injection."
        ],
        exam:
            "Explain RAG architecture.",
        quiz: {
            question: "What does RAG add to generation?",
            options: [
                "Retrieved context",
                "Only more colors",
                "Only CSS",
                "Only images"
            ],
            answer: 0
        }
    },


    {
        id: "reinforcement-learning",
        area: "Reinforcement Learning",
        level: "Advanced",
        icon: "🎮",
        title: "Reinforcement Learning",
        summary: "Learn agents, rewards and policies.",
        definition:
            "Reinforcement Learning trains an agent through interaction with an environment and feedback in the form of rewards.",
        why:
            "RL is useful for sequential decision-making problems.",
        working:
            "The agent observes a state, chooses an action, receives reward and updates its behavior.",
        formula:
            "State → Action → Reward → New State",
        animation: [
            "Agent",
            "Action",
            "Environment",
            "Reward",
            "Learning"
        ],
        example:
            "An agent learns how to navigate a maze by receiving rewards for reaching a goal.",
        points: [
            "State.",
            "Action.",
            "Reward.",
            "Policy.",
            "Value."
        ],
        exam:
            "Explain the basic components of Reinforcement Learning.",
        quiz: {
            question: "What guides an RL agent's learning?",
            options: [
                "Rewards",
                "Only labels",
                "Only images",
                "Only matrices"
            ],
            answer: 0
        }
    },


    {
        id: "ai-agents",
        area: "AI Agents",
        level: "Advanced",
        icon: "🧑‍💻",
        title: "AI Agents",
        summary: "Learn intelligent agents, tools and decision-making.",
        definition:
            "An intelligent agent perceives its environment and takes actions to achieve goals.",
        why:
            "Agents are important in modern AI systems that can reason and use tools.",
        working:
            "An agent observes information, decides what to do, performs actions and evaluates the result.",
        formula:
            "Perceive → Reason → Act → Observe",
        animation: [
            "Observe",
            "Reason",
            "Plan",
            "Tool",
            "Result"
        ],
        example:
            "An AI agent can search information, process it and produce a final response.",
        points: [
            "Perception.",
            "Reasoning.",
            "Planning.",
            "Action.",
            "Tool usage."
        ],
        exam:
            "Explain the architecture of an intelligent agent.",
        quiz: {
            question: "An intelligent agent primarily:",
            options: [
                "Perceives and acts",
                "Only stores files",
                "Only draws images",
                "Only calculates averages"
            ],
            answer: 0
        }
    },


    {
        id: "mlops",
        area: "AI Engineering",
        level: "Advanced",
        icon: "🚀",
        title: "MLOps",
        summary: "Learn how ML models are tested, deployed and monitored.",
        definition:
            "MLOps applies software engineering and operational practices to Machine Learning systems.",
        why:
            "A model is useful only when it can reliably operate in a real environment.",
        working:
            "Typical workflows include data preparation, training, validation, deployment, monitoring and retraining.",
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
            "Deploy a prediction model as an API and monitor its performance.",
        points: [
            "Model deployment.",
            "Versioning.",
            "Monitoring.",
            "Data drift.",
            "Retraining."
        ],
        exam:
            "Explain the importance of MLOps.",
        quiz: {
            question: "MLOps focuses on:",
            options: [
                "Operating ML systems",
                "Only drawing UI",
                "Only writing HTML",
                "Only mathematics"
            ],
            answer: 0
        }
    }

];


/* =========================================================
   DEEP LEARNING SYLLABUS
   ========================================================= */

const DL_UNITS = [

    {
        title: "UNIT 1 — Neural Networks",
        hours: 8,
        description:
            "Neural networks, perceptron, convergence, LMS, multilayer networks and backpropagation.",
        lessons: [

            dl(
                "A Neural Network",
                "A neural network is a collection of interconnected artificial neurons that learns relationships between inputs and outputs.",
                "Input → Neurons → Hidden Layers → Output",
                "Learn how neurons are connected and how information flows through the network.",
                "Network output is produced by applying weighted transformations and nonlinear activation functions.",
                [
                    "A network contains input, hidden and output layers.",
                    "Weights represent learned parameters.",
                    "Bias shifts the activation."
                ],
                "Network = Layers of connected neurons"
            ),

            dl(
                "Human Brain",
                "The biological brain contains neurons that communicate through connections. Artificial neural networks are inspired by this idea but are mathematical models rather than exact brain simulations.",
                "Signal → Neuron → Connection → Next Neuron",
                "Understand the inspiration behind artificial neural networks.",
                "Biological neurons receive signals, process them and transmit signals.",
                [
                    "Biological neurons inspired artificial neurons.",
                    "Artificial neural networks are mathematical models.",
                    "The comparison is conceptual."
                ],
                "Biological inspiration → Mathematical model"
            ),

            dl(
                "Models of a Neuron",
                "An artificial neuron calculates a weighted sum and applies an activation function.",
                "x₁,x₂ → Weights → Σ → Activation → y",
                "Inputs are multiplied by weights, added with bias and passed through an activation.",
                "z = Σwᵢxᵢ + b",
                [
                    "x = input",
                    "w = weight",
                    "b = bias",
                    "activation(z) produces output"
                ],
                "z = wᵀx + b"
            ),

            dl(
                "Representing Neural Networks as Graphs",
                "A neural network can be represented as a computational graph where nodes perform operations and edges carry values.",
                "Input → Operation → Operation → Output",
                "Graphs help visualize forward computation and backpropagation.",
                "Each edge can represent a parameter and each node can represent a mathematical operation.",
                [
                    "Nodes represent computations.",
                    "Edges carry values.",
                    "Backpropagation traverses the graph backward."
                ],
                "Computational Graph"
            ),

            dl(
                "Network Architectures",
                "Architecture describes how neurons and layers are arranged.",
                "Input Layer → Hidden Layer(s) → Output Layer",
                "Understand single-layer and multilayer architectures.",
                "Architecture determines the flow and representational capacity of the model.",
                [
                    "Single-layer networks have limited representation.",
                    "Multilayer networks can learn nonlinear relationships.",
                    "Architecture should match the problem."
                ],
                "Input → Hidden → Output"
            ),

            dl(
                "Perceptron",
                "The perceptron is a simple linear classifier based on a weighted sum followed by a threshold.",
                "Inputs → Weighted Sum → Step → Output",
                "The perceptron predicts one of two classes using a linear decision boundary.",
                "y = step(wᵀx + b)",
                [
                    "Simple binary classifier.",
                    "Uses a threshold activation.",
                    "Works when classes are linearly separable."
                ],
                "y = step(wᵀx + b)"
            ),

            dl(
                "Perceptron Convergence Theorem",
                "The perceptron learning algorithm converges when the training data is linearly separable under standard assumptions.",
                "Training → Mistake → Update → Repeat → Convergence",
                "Understand the condition required for convergence.",
                "The theorem does not guarantee convergence for non-linearly separable data.",
                [
                    "Linear separability is important.",
                    "Weights are updated after classification errors.",
                    "Non-separable data may not converge."
                ],
                "Linearly separable → convergence"
            ),

            dl(
                "Learning Curves",
                "Learning curves show model performance as training progresses or as training data increases.",
                "Training → Loss/Accuracy → Plot → Diagnose",
                "Use curves to identify underfitting, overfitting and training problems.",
                "Plot training and validation performance against epochs or dataset size.",
                [
                    "Training loss usually decreases.",
                    "Validation behavior helps diagnose generalization.",
                    "Large gaps can indicate overfitting."
                ],
                "Epoch → Performance"
            ),

            dl(
                "Least Mean Square Algorithm",
                "LMS updates parameters to minimize mean squared prediction error.",
                "Prediction → Error → Gradient → Update",
                "LMS is closely related to gradient-based learning for squared error.",
                "L = 1/2(t-y)²",
                [
                    "Uses squared error.",
                    "Updates parameters based on error.",
                    "Learning rate controls update size."
                ],
                "w ← w + η(t-y)x"
            ),

            dl(
                "Back Propagation Algorithm",
                "Backpropagation computes gradients of the loss through the network using the chain rule.",
                "Forward → Loss → Backward → Gradients → Update",
                "First calculate output, then propagate error information backward.",
                "w ← w − η ∂L/∂w",
                [
                    "Forward pass calculates predictions.",
                    "Loss measures error.",
                    "Backward pass calculates gradients.",
                    "Optimizer updates parameters."
                ],
                "Gradient = Chain Rule"
            ),

            dl(
                "XOR Problem",
                "XOR is not linearly separable, so a single perceptron cannot represent it.",
                "XOR Data → No Single Line → Hidden Layer → Solution",
                "Understand why multilayer networks are required for nonlinear problems.",
                "A hidden layer with nonlinear activation can represent XOR.",
                [
                    "XOR is a classic nonlinear classification problem.",
                    "Single-layer perceptron fails.",
                    "MLP can solve it."
                ],
                "XOR → Nonlinear boundary"
            ),

            dl(
                "Heuristics",
                "Heuristics are practical rules used to improve neural network training.",
                "Problem → Practical Rule → Training → Better Result",
                "Understand that neural network design often uses empirical choices.",
                "Examples include initialization, learning rate selection and architecture choices.",
                [
                    "Use suitable initialization.",
                    "Choose a suitable learning rate.",
                    "Normalize inputs when appropriate."
                ],
                "Heuristic = Practical rule"
            ),

            dl(
                "Online and Batch Learning",
                "Batch learning uses a collection of examples for an update, while online learning updates using individual examples.",
                "Data → Batch/Example → Gradient → Update",
                "Understand the tradeoff between stable gradients and frequent updates.",
                "Batch gradient uses multiple examples; online learning updates frequently.",
                [
                    "Batch can provide stable gradients.",
                    "Online learning can react quickly.",
                    "Mini-batch learning is widely used."
                ],
                "Batch size controls update frequency"
            ),

            dl(
                "Optimal Annealing and Adaptive Learning Rate",
                "Learning rate can be reduced or adapted during training.",
                "High LR → Training → Reduce/Adapt LR → Fine Tuning",
                "A large learning rate can speed early training while smaller steps can improve final convergence.",
                "η controls parameter update magnitude.",
                [
                    "Too large can destabilize training.",
                    "Too small can make learning slow.",
                    "Schedules and adaptive optimizers can help."
                ],
                "θ ← θ − η∇L"
            )

        ]
    },


    {
        title: "UNIT 2 — Deep Feedforward Networks",
        hours: 7,
        description:
            "Gradient-based learning, hidden units, saturation, vanishing gradients, ReLU and optimization.",
        lessons: [

            dl(
                "Gradient-Based Learning",
                "Gradient-based learning changes parameters in the direction that reduces the loss.",
                "Loss → Gradient → Opposite Direction → Update",
                "The gradient indicates how the loss changes with respect to parameters.",
                "θ ← θ − η∇θL",
                [
                    "Gradient points toward increasing loss.",
                    "Negative gradient is used for minimization.",
                    "Learning rate controls step size."
                ],
                "θ ← θ − η∇L"
            ),

            dl(
                "Hidden Units",
                "Hidden units are neurons between input and output layers.",
                "Input → Hidden Units → Output",
                "Hidden units transform representations and allow networks to model complex relationships.",
                "h = φ(Wx+b)",
                [
                    "Hidden layers learn intermediate representations.",
                    "Activation functions provide nonlinearity.",
                    "More layers can create hierarchical representations."
                ],
                "h = φ(Wx+b)"
            ),

            dl(
                "Architecture",
                "Deep feedforward networks pass information forward without recurrent connections.",
                "Input → Layer 1 → Layer 2 → ... → Output",
                "Understand depth, width and connectivity.",
                "Each layer transforms the representation produced by the previous layer.",
                [
                    "Depth = number of layers.",
                    "Width = number of units.",
                    "Architecture affects capacity and computation."
                ],
                "hˡ = φ(Wˡhˡ⁻¹+bˡ)"
            ),

            dl(
                "Saturation",
                "An activation saturates when its output changes very little for large positive or negative inputs.",
                "Large Input → Saturated Activation → Small Gradient",
                "Saturation can slow learning because derivatives become small.",
                "For sigmoid, derivatives become small near outputs close to 0 or 1.",
                [
                    "Sigmoid and tanh can saturate.",
                    "Small gradients slow parameter updates.",
                    "Activation choice affects optimization."
                ],
                "Small derivative → Slow learning"
            ),

            dl(
                "Vanishing Gradient",
                "Vanishing gradients occur when gradients become extremely small as they propagate through many layers or time steps.",
                "Gradient → × Small Derivative → Smaller → Near Zero",
                "Very small gradients prevent early layers from learning effectively.",
                "Gradient magnitude can shrink through repeated multiplication.",
                [
                    "Common with deep networks using saturating activations.",
                    "Also important in RNNs.",
                    "Can slow or stop useful learning."
                ],
                "∏ derivatives → very small"
            ),

            dl(
                "Ways to Mitigate Vanishing Gradient",
                "Several techniques can improve gradient flow.",
                "Problem → ReLU/Init/Norm/Architecture → Better Gradient Flow",
                "Common solutions include suitable initialization, ReLU-like activations, normalization and architectural improvements.",
                "Good gradient flow is necessary for efficient optimization.",
                [
                    "Use ReLU-family activations where appropriate.",
                    "Use good initialization.",
                    "Normalization can help.",
                    "Residual connections are useful in modern deep networks."
                ],
                "Better gradient flow → Better learning"
            ),

            dl(
                "ReLU",
                "ReLU outputs zero for negative values and the input for positive values.",
                "x → ReLU → max(0,x)",
                "ReLU is simple and generally avoids saturation on the positive side.",
                "ReLU(x) = max(0,x)",
                [
                    "Fast to compute.",
                    "Positive region has derivative 1.",
                    "Can produce inactive neurons for negative inputs."
                ],
                "ReLU(x)=max(0,x)"
            ),

            dl(
                "Avoiding Bad Local Minima",
                "Training can be improved using initialization, normalization, suitable architectures and optimizers.",
                "Initialization → Optimization → Regularization → Better Training",
                "Understand practical strategies rather than assuming optimization is always perfect.",
                "Different initialization and optimization choices change the training landscape experienced by the model.",
                [
                    "Good initialization.",
                    "Appropriate learning rate.",
                    "Normalization.",
                    "Modern optimizers."
                ],
                "Good setup → Better optimization"
            ),

            dl(
                "Heuristics for Faster Training",
                "Training speed can be improved through efficient data pipelines, mini-batches, suitable optimizers and hardware.",
                "Data → Mini-batch → GPU → Optimizer → Faster Training",
                "Use computational resources and optimization techniques efficiently.",
                "Training cost depends on model size, dataset size and hardware.",
                [
                    "Mini-batch training.",
                    "Vectorized operations.",
                    "GPU acceleration.",
                    "Adaptive optimizers."
                ],
                "Efficient computation → Faster training"
            ),

            dl(
                "Nesterov Accelerated Gradient Descent",
                "Nesterov momentum looks ahead before calculating the gradient.",
                "Current Point → Look Ahead → Gradient → Update",
                "The look-ahead idea can improve momentum-based optimization.",
                "A conceptual form is vₜ = μvₜ₋₁ − η∇L(θₜ₋₁ + μvₜ₋₁).",
                [
                    "Uses momentum.",
                    "Gradient is evaluated at a look-ahead position.",
                    "Can improve convergence behavior."
                ],
                "Look ahead → calculate gradient → update"
            )

        ]
    },


    {
        title: "UNIT 3 — Regularization and Optimization",
        hours: 7,
        description:
            "Regularization, augmentation, dropout, adversarial training, AdaBoost and RMSprop.",
        lessons: [

            dl(
                "Parameter Norm Penalties",
                "Norm penalties add a cost for large parameter values.",
                "Loss + Penalty → Total Loss → Optimization",
                "Regularization can reduce overfitting.",
                "L2: L = L₀ + λΣw²; L1: L = L₀ + λΣ|w|",
                [
                    "L1 encourages sparsity.",
                    "L2 discourages large weights.",
                    "λ controls regularization strength."
                ],
                "Total Loss = Data Loss + Regularization"
            ),

            dl(
                "Parameter Norm Penalties as Constrained Optimization",
                "Regularization can be interpreted as restricting parameter size.",
                "Parameters → Constraint → Optimization",
                "Understand the relationship between penalty-based and constrained optimization views.",
                "Minimize L(θ) subject to ||θ|| ≤ c.",
                [
                    "Penalty form adds cost.",
                    "Constraint form limits parameter norm.",
                    "Both encourage simpler parameter values."
                ],
                "min L(θ) subject to ||θ||≤c"
            ),

            dl(
                "Under-Constrained Problems",
                "An under-constrained problem can have many parameter settings that fit the training data.",
                "Training Data → Many Solutions → Regularization → Preferred Solution",
                "Regularization and inductive biases help select useful solutions.",
                "Additional constraints can improve generalization.",
                [
                    "Multiple solutions can fit training data.",
                    "Regularization favors simpler solutions.",
                    "Generalization is the real goal."
                ],
                "Many solutions → choose a useful one"
            ),

            dl(
                "Dataset Augmentation",
                "Data augmentation creates modified training examples that preserve the target concept.",
                "Original Data → Transform → New Data",
                "More varied training examples can improve generalization.",
                "Examples include image flips, crops, rotations or small perturbations when label-preserving.",
                [
                    "Must preserve the label meaning.",
                    "Common in computer vision.",
                    "Can reduce overfitting."
                ],
                "Data → Transformations → More training examples"
            ),

            dl(
                "Noise Robustness",
                "Noise robustness means maintaining useful performance when inputs contain small disturbances or imperfections.",
                "Clean Input + Noise → Model → Stable Prediction",
                "Real-world data is rarely perfect.",
                "Training with suitable noise can improve robustness.",
                [
                    "Noise can be added carefully during training.",
                    "Robust models should not overreact to small changes.",
                    "Noise must not destroy useful information."
                ],
                "Robustness = stable prediction"
            ),

            dl(
                "Semi-Supervised Learning",
                "Semi-supervised learning uses both labeled and unlabeled data.",
                "Labeled + Unlabeled → Learning → Model",
                "It is useful when labeling is expensive but raw data is plentiful.",
                "The model learns from available labels while exploiting structure in unlabeled examples.",
                [
                    "Uses limited labeled data.",
                    "Uses larger unlabeled datasets.",
                    "Useful in many real applications."
                ],
                "Labeled + Unlabeled Data"
            ),

            dl(
                "Multi-Task Learning",
                "Multi-task learning trains a model to solve multiple related tasks.",
                "Shared Representation → Task A + Task B + Task C",
                "Related tasks can share useful representations.",
                "A shared model can have task-specific output heads.",
                [
                    "Shared parameters learn common features.",
                    "Task-specific heads handle individual objectives.",
                    "Tasks should be related enough to benefit."
                ],
                "Shared representation → Multiple tasks"
            ),

            dl(
                "Early Stopping",
                "Early stopping stops training when validation performance stops improving.",
                "Training → Validation → Best Point → Stop",
                "It helps prevent overfitting.",
                "Monitor validation loss or another validation metric.",
                [
                    "Training loss may continue decreasing.",
                    "Validation loss can start increasing.",
                    "Stop near the best validation performance."
                ],
                "Best validation point → stop"
            ),

            dl(
                "Parameter Tying and Sharing",
                "Parameter sharing means the same parameters are reused in multiple places.",
                "Same Parameters → Multiple Positions",
                "It reduces parameter count and introduces useful structure.",
                "CNN filters are a major example of parameter sharing.",
                [
                    "Reduces number of parameters.",
                    "Useful for translation-equivariant patterns.",
                    "CNNs share filter weights spatially."
                ],
                "One filter → many locations"
            ),

            dl(
                "Sparse Representations",
                "Sparse representations contain many zero or near-zero values.",
                "Dense Representation → Sparse Representation",
                "Sparsity can make representations efficient and sometimes easier to interpret.",
                "L1 regularization is one method that can encourage sparsity.",
                [
                    "Many activations can be zero.",
                    "Sparse coding can represent data efficiently.",
                    "Sparsity can reduce computation in some settings."
                ],
                "Many zeros → compact representation"
            ),

            dl(
                "Dropout",
                "Dropout randomly removes units during training.",
                "Network → Random Units Off → Training → Full Network",
                "It reduces reliance on particular neurons and can reduce overfitting.",
                "A dropout probability p determines the fraction of units dropped during training.",
                [
                    "Used during training.",
                    "Usually disabled during inference.",
                    "Acts as a regularizer."
                ],
                "Randomly remove neurons"
            ),

            dl(
                "Adversarial Training",
                "Adversarial training exposes models to carefully constructed perturbed examples during training.",
                "Input → Perturbation → Model → Robust Training",
                "It can improve robustness against certain small input perturbations.",
                "The goal is to reduce sensitivity to adversarially chosen perturbations.",
                [
                    "Perturbations are designed to challenge the model.",
                    "Training includes robust examples.",
                    "Robustness is evaluated against defined threat models."
                ],
                "Clean + Challenging examples → robust model"
            ),

            dl(
                "Tangent Distance",
                "Tangent distance measures similarity while considering small transformations of patterns.",
                "Pattern → Small Transformations → Distance",
                "It can make comparisons less sensitive to certain transformations.",
                "Distance is calculated with respect to transformation manifolds.",
                [
                    "Useful concept for pattern recognition.",
                    "Handles small transformations.",
                    "Connected to manifold ideas."
                ],
                "Transformation-aware distance"
            ),

            dl(
                "Tangent Prop",
                "Tangent propagation encourages model outputs to be stable under selected transformations.",
                "Input → Transformation Direction → Output Stability",
                "It introduces invariance constraints into learning.",
                "The derivative along a transformation direction can be penalized.",
                [
                    "Encourages invariance.",
                    "Uses transformation information.",
                    "Can improve robustness to selected changes."
                ],
                "Small transformation → similar output"
            ),

            dl(
                "Manifold Tangent Classifier",
                "A manifold tangent classifier encourages classification boundaries that respect the local structure of data.",
                "Data Manifold → Tangent Direction → Stable Representation",
                "Many real datasets lie near lower-dimensional manifolds.",
                "The classifier learns representations that are stable along selected manifold directions.",
                [
                    "Uses manifold assumption.",
                    "Encourages local invariance.",
                    "Connects geometry and classification."
                ],
                "Manifold → tangent direction → invariant representation"
            ),

            dl(
                "AdaBoost",
                "AdaBoost combines weak learners sequentially while focusing more on difficult examples.",
                "Weak Learner → Errors → Reweight → Next Learner",
                "The ensemble gradually focuses on examples previous learners handled poorly.",
                "A simplified ensemble prediction is F(x)=Σ αₜhₜ(x).",
                [
                    "Sequential boosting.",
                    "Weak learners.",
                    "Focuses on mistakes.",
                    "Combines weighted learners."
                ],
                "Learner → mistakes → reweight → next learner"
            ),

            dl(
                "RMSprop",
                "RMSprop adapts learning rates using a moving average of squared gradients.",
                "Gradient → Squared Gradient → Moving Average → Adaptive Update",
                "It can help optimization when gradient magnitudes vary across parameters.",
                "sₜ = ρsₜ₋₁ + (1−ρ)gₜ²",
                [
                    "Uses moving average of squared gradients.",
                    "Adapts parameter-wise step sizes.",
                    "Often useful for neural network optimization."
                ],
                "Adaptive step ≈ η / √(s+ε)"
            )

        ]
    },


    {
        title: "UNIT 4 — Convolutional Neural Networks",
        hours: 7,
        description:
            "CNN structure, training, convolution backpropagation, matrix view and augmentation.",
        lessons: [

            dl(
                "Introduction to CNN",
                "CNNs are neural networks designed to exploit local spatial structure.",
                "Image → Filters → Feature Maps → Prediction",
                "CNNs are especially useful for image and spatial data.",
                "Convolution applies a learned kernel across spatial locations.",
                [
                    "Local connectivity.",
                    "Parameter sharing.",
                    "Hierarchical features."
                ],
                "Image → Convolution → Features"
            ),

            dl(
                "Structure of CNN",
                "A typical CNN contains convolution layers, activation functions, pooling or strided operations and output layers.",
                "Input → Conv → Activation → Pool → Conv → Output",
                "Understand how spatial representations evolve through layers.",
                "Feature maps are transformed through successive layers.",
                [
                    "Convolution extracts features.",
                    "Activation introduces nonlinearity.",
                    "Pooling or striding can reduce spatial resolution."
                ],
                "Conv → Activation → Pool"
            ),

            dl(
                "Training a CNN",
                "CNN training uses forward propagation, loss calculation, backpropagation and parameter updates.",
                "Image → Prediction → Loss → Gradients → Update",
                "Filters are learned from training data.",
                "Parameters are updated using gradient-based optimization.",
                [
                    "Forward pass.",
                    "Loss.",
                    "Backpropagation.",
                    "Optimizer."
                ],
                "θ ← θ − η∇L"
            ),

            dl(
                "Backpropagation Through Convolutions",
                "Gradients flow through convolution operations so filter parameters can be learned.",
                "Feature Map → Gradient → Filter Gradient → Update",
                "Each filter receives gradients from the output loss.",
                "The derivative accounts for how filter values affect the feature map.",
                [
                    "Filters are learnable parameters.",
                    "Gradients update filters.",
                    "Backpropagation follows the computational graph."
                ],
                "Loss → ∂L/∂Filter"
            ),

            dl(
                "Transposed Convolution",
                "Transposed convolution is an operation often used for learned upsampling.",
                "Small Feature Map → Transposed Conv → Larger Feature Map",
                "Understand the relationship between convolution operators and their gradients/adjoints.",
                "It is commonly used in decoder or generative architectures.",
                [
                    "Can increase spatial dimensions.",
                    "Not simply an ordinary convolution run backward.",
                    "Output size depends on stride, padding and kernel."
                ],
                "Low resolution → learned upsampling"
            ),

            dl(
                "Convolution as Matrix Multiplication",
                "A convolution can be transformed into matrix multiplication using suitable data rearrangement.",
                "Image → Matrix Representation → Matrix Multiply → Output",
                "This helps explain efficient implementation of convolutions.",
                "Conceptually y = Kx after rearranging local patches.",
                [
                    "Local patches can be flattened.",
                    "Filters can be represented as rows.",
                    "Matrix multiplication can implement convolution."
                ],
                "y = Kx"
            ),

            dl(
                "Data Augmentation in CNN",
                "Image augmentation creates realistic variations of training images.",
                "Image → Flip/Crop/Rotate → New Image",
                "It helps models generalize beyond exact training examples.",
                "Augmentation should preserve the intended label.",
                [
                    "Random crop.",
                    "Horizontal flip where appropriate.",
                    "Small rotation.",
                    "Brightness or contrast changes when valid."
                ],
                "More variation → Better generalization"
            ),

            dl(
                "CNN Filters",
                "Filters are learned kernels that detect local patterns.",
                "Image Patch → Kernel → Dot Product → Feature",
                "Early filters may learn edges and simple textures while deeper layers combine features.",
                "A convolution computes weighted sums over local regions.",
                [
                    "Kernel contains learnable weights.",
                    "Stride controls movement.",
                    "Padding controls border handling."
                ],
                "Patch × Kernel → Feature"
            )

        ]
    },


    {
        title: "UNIT 5 — Recurrent Neural Networks",
        hours: 7,
        description:
            "RNN architecture, language modeling, bidirectional and multilayer RNNs, LSTM and GRU.",
        lessons: [

            dl(
                "Introduction to RNN",
                "RNNs process sequential inputs while maintaining a hidden state.",
                "x₁ → h₁ → x₂ → h₂ → x₃ → h₃",
                "The hidden state carries information from previous time steps.",
                "hₜ = f(Wxₜ + Uhₜ₋₁ + b)",
                [
                    "Sequential processing.",
                    "Hidden state.",
                    "Shared parameters across time."
                ],
                "hₜ = f(Wxₜ + Uhₜ₋₁+b)"
            ),

            dl(
                "Expressiveness of RNN",
                "RNNs can represent temporal relationships and dependencies across sequence positions.",
                "Sequence → Hidden States → Output",
                "The hidden state acts as a learned representation of previous information.",
                "Different architectures provide different representational capacity.",
                [
                    "Can model variable-length sequences.",
                    "Can use previous context.",
                    "Long dependencies can be difficult."
                ],
                "History → Hidden State"
            ),

            dl(
                "RNN Architecture",
                "The same recurrent cell is applied repeatedly across time steps.",
                "xₜ + hₜ₋₁ → Cell → hₜ",
                "Parameters are shared across time.",
                "hₜ = f(Wxₜ + Uhₜ₋₁+b)",
                [
                    "Input at each time step.",
                    "Previous hidden state.",
                    "New hidden state."
                ],
                "xₜ + hₜ₋₁ → hₜ"
            ),

            dl(
                "Language Modeling",
                "Language modeling estimates the probability of a sequence or predicts the next token.",
                "Tokens → Context → Next Token Probability",
                "A model learns relationships between previous tokens and future tokens.",
                "P(xₜ|x₁,...,xₜ₋₁)",
                [
                    "Token sequence.",
                    "Context.",
                    "Probability distribution.",
                    "Next-token prediction."
                ],
                "Context → P(next token)"
            ),

            dl(
                "Backpropagation Through Time",
                "BPTT applies backpropagation across the unrolled time steps of an RNN.",
                "Time Steps → Forward → Loss → Backward Through Time",
                "Gradients flow through repeated recurrent computations.",
                "The chain rule is applied through each time step.",
                [
                    "Unroll the RNN.",
                    "Calculate loss.",
                    "Backpropagate through time.",
                    "Update shared parameters."
                ],
                "Loss → tₙ → ... → t₂ → t₁"
            ),

            dl(
                "Bidirectional RNN",
                "A bidirectional RNN processes a sequence in both forward and backward directions.",
                "Forward →→ + ←← Backward → Combined Representation",
                "It can use past and future context when the entire sequence is available.",
                "hₜ = [hₜᶠ ; hₜᵇ]",
                [
                    "Forward RNN.",
                    "Backward RNN.",
                    "Combined hidden representation."
                ],
                "Past Context + Future Context"
            ),

            dl(
                "Multilayer RNN",
                "Multiple recurrent layers can be stacked to learn hierarchical sequence representations.",
                "RNN Layer 1 → RNN Layer 2 → RNN Layer 3",
                "Higher layers can learn more abstract temporal patterns.",
                "Each layer receives the sequence representation from the previous layer.",
                [
                    "Stacked recurrent layers.",
                    "Higher representational capacity.",
                    "More computation and optimization difficulty."
                ],
                "RNN → RNN → RNN"
            ),

            dl(
                "Challenges of Training RNNs",
                "RNN training can suffer from vanishing and exploding gradients.",
                "Long Sequence → Repeated Gradients → Vanish/Explode",
                "Repeated multiplication through time makes gradient stability difficult.",
                "Gradients can become very small or very large.",
                [
                    "Vanishing gradient.",
                    "Exploding gradient.",
                    "Long-term dependencies.",
                    "Sequential computation."
                ],
                "Repeated derivatives → unstable gradients"
            ),

            dl(
                "Layer Normalization",
                "Layer normalization normalizes activations across features for each example.",
                "Hidden State → Normalize → Scale/Shift",
                "It can stabilize optimization in recurrent and other networks.",
                "A common form normalizes using the mean and variance of features.",
                [
                    "Normalizes hidden activations.",
                    "Uses learnable scale and shift.",
                    "Can improve training stability."
                ],
                "x → normalized x → γx+β"
            ),

            dl(
                "Echo State Networks",
                "Echo State Networks use a large recurrent reservoir with mostly fixed recurrent weights and train a readout.",
                "Input → Reservoir → Readout",
                "The reservoir transforms temporal input into a rich dynamic representation.",
                "Only selected output weights are typically trained.",
                [
                    "Reservoir computing.",
                    "Random/fixed recurrent dynamics.",
                    "Trainable readout."
                ],
                "Input → Reservoir → Output"
            ),

            dl(
                "LSTM",
                "LSTM introduces gates and a cell state to manage long-term information.",
                "Input → Gates → Cell State → Hidden State",
                "Forget, input and output gates control information flow.",
                "cₜ = fₜ⊙cₜ₋₁ + iₜ⊙ĉₜ",
                [
                    "Forget gate.",
                    "Input gate.",
                    "Candidate state.",
                    "Output gate."
                ],
                "Cell State = controlled memory"
            ),

            dl(
                "GRU",
                "GRU is a gated recurrent architecture using update and reset mechanisms.",
                "Input + Previous State → Gates → New State",
                "GRU provides a simpler gated design than LSTM.",
                "A common formulation uses update gate zₜ and reset gate rₜ.",
                [
                    "Update gate.",
                    "Reset gate.",
                    "Hidden state.",
                    "Fewer gates than LSTM."
                ],
                "Gates → controlled state update"
            ),

            dl(
                "Applications of RNN",
                "RNN-family models can be applied to sequential and temporal problems.",
                "Sequence → Model → Prediction",
                "Applications include time series, speech, text and sequence classification.",
                "The model choice depends on sequence length, data type and task.",
                [
                    "Language modeling.",
                    "Time-series prediction.",
                    "Sequence classification.",
                    "Speech-related tasks."
                ],
                "Sequence → RNN/LSTM/GRU → Output"
            )

        ]
    }

];


/* =========================================================
   DL HELPER
   ========================================================= */

function dl(
    title,
    explanation,
    animation,
    understanding,
    formula,
    points,
    revision
) {

    return {
        title,
        explanation,
        animation,
        understanding,
        formula,
        points,
        revision
    };

}


/* =========================================================
   RENDER CURRICULUM
   ========================================================= */

function renderLessons(list = lessons) {

    const grid =
        document.getElementById("lessonGrid");

    if (!grid) return;

    grid.innerHTML = "";

    document.getElementById("homeTopicCount").textContent =
        lessons.length;


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="lesson-card">
                <h3>No topics found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach((lesson, index) => {

        const card =
            document.createElement("article");

        card.className = "lesson-card";

        const completed =
            state.completed.includes(lesson.id);

        card.innerHTML = `

            <span class="lesson-level">
                ${lesson.level}
            </span>

            <div class="lesson-icon">
                ${lesson.icon}
            </div>

            <h3>
                ${lesson.title}
            </h3>

            <p>
                ${lesson.summary}
            </p>

            <span class="lesson-area">
                ${lesson.area}
            </span>

            ${
                completed
                    ? `<div style="margin-top:12px;color:#00e676;font-weight:800;">
                            ✓ Learned
                       </div>`
                    : ""
            }

        `;

        card.addEventListener("click", () => {

            openLesson(index, list);

        });

        grid.appendChild(card);

    });

}


function filterLessons() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const area =
        document
            .getElementById("areaFilter")
            .value;


    const filtered =
        lessons.filter(lesson => {

            const matchesSearch =
                lesson.title
                    .toLowerCase()
                    .includes(search) ||

                lesson.summary
                    .toLowerCase()
                    .includes(search) ||

                lesson.area
                    .toLowerCase()
                    .includes(search);

            const matchesArea =
                area === "all" ||
                lesson.area === area;

            return matchesSearch && matchesArea;

        });


    renderLessons(filtered);

}


/* =========================================================
   LESSON MODAL
   ========================================================= */

function openLesson(index, list) {

    const lesson = list[index];

    if (!lesson) return;

    const modal =
        document.getElementById("lessonModal");

    const content =
        document.getElementById("modalContent");


    const flow =
        lesson.animation
            .map((item, i) => {

                const arrow =
                    i < lesson.animation.length - 1
                        ? `<span>→</span>`
                        : "";

                return `
                    <span>
                        ${item}
                    </span>
                    ${arrow}
                `;

            })
            .join("");


    content.innerHTML = `

        <button
            class="close-btn"
            onclick="closeModal()"
        >
            ×
        </button>

        <span class="badge">
            ${lesson.area} • ${lesson.level}
        </span>

        <h1>
            ${lesson.icon} ${lesson.title}
        </h1>

        <p>
            ${lesson.summary}
        </p>


        <h3>📖 What is it?</h3>

        <p>
            ${lesson.definition}
        </p>


        <h3>🎯 Why do we learn it?</h3>

        <p>
            ${lesson.why}
        </p>


        <h3>⚙️ How does it work?</h3>

        <p>
            ${lesson.working}
        </p>


        <div class="modal-animation">

            <h3>🎬 Animated Explanation</h3>

            <div class="modal-flow">
                ${flow}
            </div>

        </div>


        <h3>📐 Formula / Key Idea</h3>

        <div class="formula">
            ${lesson.formula}
        </div>


        <h3>💡 Example</h3>

        <p>
            ${lesson.example}
        </p>


        <h3>📝 Exam Points</h3>

        <ul>
            ${lesson.points
                .map(point => `<li>${point}</li>`)
                .join("")}
        </ul>


        <h3>🎓 Exam Question</h3>

        <p>
            ${lesson.exam}
        </p>


        <div class="quick-check">

            <h3>🧠 Quick Knowledge Check</h3>

            <p>
                ${lesson.quiz.question}
            </p>

            ${lesson.quiz.options
                .map(
                    (option, i) => `
                        <button
                            onclick="answerLessonQuiz(
                                '${lesson.id}',
                                ${i},
                                ${lesson.quiz.answer}
                            )"
                        >
                            ${String.fromCharCode(65 + i)}.
                            ${option}
                        </button>
                    `
                )
                .join("")}

        </div>


        <div style="margin-top:25px;">

            <button
                class="primary-btn"
                onclick="markLessonComplete('${lesson.id}')"
            >
                ✓ Mark as Learned
            </button>

        </div>

    `;

    modal.classList.add("show");

}


function closeModal() {

    document
        .getElementById("lessonModal")
        .classList.remove("show");

}


window.addEventListener("click", event => {

    const modal =
        document.getElementById("lessonModal");

    if (event.target === modal) {

        closeModal();

    }

});


function markLessonComplete(id) {

    if (!state.completed.includes(id)) {

        state.completed.push(id);

        saveState();

    }

    renderLessons();

    updateDashboard();

    alert("Topic marked as learned!");

}


function answerLessonQuiz(
    lessonId,
    selected,
    correct
) {

    if (!state.topicScores[lessonId]) {

        state.topicScores[lessonId] = {
            correct: 0,
            attempts: 0
        };

    }

    state.topicScores[lessonId].attempts++;

    const buttons =
        document.querySelectorAll(
            ".quick-check button"
        );

    buttons.forEach(button => {

        button.disabled = true;

    });


    if (selected === correct) {

        state.topicScores[lessonId].correct++;

        alert("Correct! 🎉");

    } else {

        alert("Not quite. Review the topic and try again.");

    }

    saveState();

}


/* =========================================================
   DEEP LEARNING RENDER
   ========================================================= */

let currentDLUnit = 0;


function renderDLUnit(unitIndex) {

    currentDLUnit = unitIndex;

    const container =
        document.getElementById("dlUnitContent");

    if (!container) return;

    const unit =
        DL_UNITS[unitIndex];

    if (!unit) return;


    document
        .querySelectorAll(".unit-tab")
        .forEach((tab, index) => {

            tab.classList.toggle(
                "active",
                index === unitIndex
            );

        });


    container.innerHTML = `

        <div class="dl-unit-header">

            <h2>
                ${unit.title}
            </h2>

            <p>
                ${unit.description}
            </p>

            <p style="margin-top:8px;">
                <strong>
                    ${unit.hours} lecture hours
                </strong>
            </p>

        </div>


        <div>

            ${unit.lessons
                .map(
                    (lesson, index) => `
                        <div class="dl-lesson">

                            <button
                                class="dl-lesson-title"
                                onclick="toggleDLLesson(${index})"
                            >

                                <span>
                                    ${index + 1}.
                                    ${lesson.title}
                                </span>

                                <span>
                                    +
                                </span>

                            </button>


                            <div
                                class="dl-lesson-body"
                                id="dlBody${index}"
                            >

                                <div class="dl-section">

                                    <h4>
                                        📖 Simple Explanation
                                    </h4>

                                    <p>
                                        ${lesson.explanation}
                                    </p>

                                </div>


                                <div class="dl-section">

                                    <h4>
                                        🎬 Animation
                                    </h4>

                                    <div class="animation-flow">

                                        ${lesson.animation
                                            .split("→")
                                            .map(
                                                (x, i, arr) => `
                                                    <div class="animation-box">
                                                        ${x.trim()}
                                                    </div>

                                                    ${
                                                        i < arr.length - 1
                                                            ? `<div class="animation-arrow">→</div>`
                                                            : ""
                                                    }
                                                `
                                            )
                                            .join("")}

                                    </div>

                                </div>


                                <div class="dl-section">

                                    <h4>
                                        🧠 Understand
                                    </h4>

                                    <p>
                                        ${lesson.understanding}
                                    </p>

                                </div>


                                <div class="dl-section">

                                    <h4>
                                        📐 Formula / Key Expression
                                    </h4>

                                    <div class="formula">
                                        ${lesson.formula}
                                    </div>

                                </div>


                                <div class="dl-section">

                                    <h4>
                                        📝 Exam-Ready Notes
                                    </h4>

                                    <ul>
                                        ${lesson.points
                                            .map(
                                                p =>
                                                    `<li>${p}</li>`
                                            )
                                            .join("")}
                                    </ul>

                                </div>


                                <div class="dl-section">

                                    <h4>
                                        🔁 Quick Revision
                                    </h4>

                                    <p>
                                        ${lesson.revision}
                                    </p>

                                </div>

                            </div>

                        </div>
                    `
                )
                .join("")}

        </div>

    `;

}


function toggleDLLesson(index) {

    const body =
        document.getElementById(
            `dlBody${index}`
        );

    if (!body) return;

    body.classList.toggle("open");

}


/* =========================================================
   ARTIFICIAL NEURON LAB
   ========================================================= */

function calculateNeuron() {

    const x1 =
        Number(document.getElementById("x1").value);

    const w1 =
        Number(document.getElementById("w1").value);

    const x2 =
        Number(document.getElementById("x2").value);

    const w2 =
        Number(document.getElementById("w2").value);


    document.getElementById("x1Value").textContent =
        x1;

    document.getElementById("w1Value").textContent =
        w1.toFixed(1);

    document.getElementById("x2Value").textContent =
        x2;

    document.getElementById("w2Value").textContent =
        w2.toFixed(1);


    const output =
        x1 * w1 + x2 * w2;


    document.getElementById("neuronOutput").textContent =
        output.toFixed(2);

}


/* =========================================================
   GRADIENT DESCENT
   ========================================================= */

let gradientAnimation = null;


function drawGradientGraph(position = 1) {

    const canvas =
        document.getElementById("gradientCanvas");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* Axes */

    ctx.beginPath();

    ctx.moveTo(40, 20);

    ctx.lineTo(40, height - 35);

    ctx.lineTo(width - 20, height - 35);

    ctx.strokeStyle = "#7c4dff";

    ctx.stroke();


    /* Curve */

    ctx.beginPath();

    for (let x = 40; x < width - 20; x++) {

        const normalized =
            (x - width / 2) / 120;

        const y =
            60 +
            normalized * normalized * 90;

        if (x === 40) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    }

    ctx.strokeStyle = "#00e5ff";

    ctx.lineWidth = 4;

    ctx.stroke();


    /* Moving point */

    const px =
        80 + position * (width - 150);

    const normalized =
        (px - width / 2) / 120;

    const py =
        60 +
        normalized * normalized * 90;


    ctx.beginPath();

    ctx.arc(
        px,
        py,
        10,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ff4081";

    ctx.fill();


    ctx.fillStyle = "#a9b7ca";

    ctx.font = "14px Arial";

    ctx.fillText(
        "Loss",
        width - 55,
        20
    );

    ctx.fillText(
        "Parameter",
        width - 90,
        height - 10
    );

}


function startGradientDescent() {

    if (gradientAnimation) {

        cancelAnimationFrame(
            gradientAnimation
        );

    }

    let position = 0.92;


    function animate() {

        position -= 0.006;

        drawGradientGraph(position);

        if (position > 0.50) {

            gradientAnimation =
                requestAnimationFrame(
                    animate
                );

        }

    }


    animate();

}


/* =========================================================
   K-MEANS
   ========================================================= */

const kmeansCanvas =
    document.getElementById("kmeansCanvas");

let kmeansPoints = [];


if (kmeansCanvas) {

    kmeansCanvas.addEventListener(
        "click",
        event => {

            const rect =
                kmeansCanvas.getBoundingClientRect();

            const scaleX =
                kmeansCanvas.width /
                rect.width;

            const scaleY =
                kmeansCanvas.height /
                rect.height;


            const x =
                (event.clientX - rect.left) *
                scaleX;

            const y =
                (event.clientY - rect.top) *
                scaleY;


            kmeansPoints.push({
                x,
                y
            });

            drawKMeans();

        }
    );

}


function drawKMeans(centroids = []) {

    if (!kmeansCanvas) return;

    const ctx =
        kmeansCanvas.getContext("2d");


    ctx.clearRect(
        0,
        0,
        kmeansCanvas.width,
        kmeansCanvas.height
    );


    /* Grid */

    ctx.strokeStyle =
        "rgba(255,255,255,0.06)";

    for (
        let x = 0;
        x <= kmeansCanvas.width;
        x += 40
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(
            x,
            kmeansCanvas.height
        );

        ctx.stroke();

    }


    for (
        let y = 0;
        y <= kmeansCanvas.height;
        y += 40
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(
            kmeansCanvas.width,
            y
        );

        ctx.stroke();

    }


    /* Points */

    kmeansPoints.forEach((point, index) => {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            7,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            index % 2 === 0
                ? "#00e5ff"
                : "#ff4081";

        ctx.fill();

    });


    /* Centroids */

    centroids.forEach(centroid => {

        ctx.beginPath();

        ctx.arc(
            centroid.x,
            centroid.y,
            13,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 4;

        ctx.stroke();

    });

}


function runKMeans() {

    if (kmeansPoints.length < 4) {

        alert(
            "Add at least 4 points by clicking inside the graph."
        );

        return;

    }


    let centroids = [

        {
            x: 100,
            y: 100
        },

        {
            x: 400,
            y: 180
        }

    ];


    let iteration = 0;


    function animateClusters() {

        iteration++;

        drawKMeans(centroids);


        const groups = [
            [],
            []
        ];


        kmeansPoints.forEach(point => {

            const d1 =
                distance(
                    point,
                    centroids[0]
                );

            const d2 =
                distance(
                    point,
                    centroids[1]
                );


            if (d1 < d2) {

                groups[0].push(point);

            } else {

                groups[1].push(point);

            }

        });


        groups.forEach((group, index) => {

            if (group.length === 0) return;

            centroids[index] = {

                x:
                    group.reduce(
                        (sum, p) => sum + p.x,
                        0
                    ) / group.length,

                y:
                    group.reduce(
                        (sum, p) => sum + p.y,
                        0
                    ) / group.length

            };

        });


        if (iteration < 12) {

            setTimeout(
                animateClusters,
                300
            );

        } else {

            drawKMeans(centroids);

        }

    }


    animateClusters();

}


function distance(a, b) {

    return Math.sqrt(
        Math.pow(a.x - b.x, 2) +
        Math.pow(a.y - b.y, 2)
    );

}


function clearKMeans() {

    kmeansPoints = [];

    drawKMeans();

}


/* =========================================================
   CNN LAB
   ========================================================= */

function createCNNGrid() {

    const grid =
        document.getElementById("cnnGrid");

    if (!grid) return;

    grid.innerHTML = "";

    for (let i = 0; i < 36; i++) {

        const cell =
            document.createElement("div");

        cell.className = "cnn-cell";

        cell.textContent =
            Math.floor(
                Math.random() * 9
            );

        grid.appendChild(cell);

    }

}


function startCNNAnimation() {

    const filter =
        document.querySelector(".cnn-filter");

    if (!filter) return;


    const positions = [

        [0, 0],
        [36, 0],
        [72, 0],
        [108, 0],

        [108, 36],
        [108, 72],
        [108, 108],

        [72, 108],
        [36, 108],
        [0, 108],

        [0, 72],
        [0, 36]

    ];


    let i = 0;


    function move() {

        const [x, y] =
            positions[i];

        filter.style.transform =
            `translate(${x}px, ${y}px)`;


        i++;


        if (i < positions.length) {

            setTimeout(
                move,
                350
            );

        }

    }


    move();

}


/* =========================================================
   RNN LAB
   ========================================================= */

function createRNNSequence() {

    const container =
        document.getElementById(
            "rnnSequence"
        );

    if (!container) return;

    container.innerHTML = "";

    ["AI", "is", "fun", "to", "learn"].forEach(
        word => {

            const node =
                document.createElement("div");

            node.className =
                "sequence-node";

            node.textContent =
                word;

            container.appendChild(node);

        }
    );

}


function startRNNAnimation() {

    const nodes =
        document.querySelectorAll(
            ".sequence-node"
        );

    let index = 0;


    nodes.forEach(node => {

        node.classList.remove("active");

    });


    function animate() {

        if (index >= nodes.length) return;

        nodes[index]
            .classList.add("active");


        if (index > 0) {

            nodes[index - 1]
                .classList.remove("active");

        }


        index++;

        setTimeout(
            animate,
            500
        );

    }


    animate();

}


/* =========================================================
   LSTM LAB
   ========================================================= */

function startLSTMAnimation() {

    const gates =
        document.querySelectorAll(
            ".lstm-gate"
        );

    let index = 0;


    gates.forEach(gate => {

        gate.classList.remove("active");

    });


    function animate() {

        if (index >= gates.length) {

            setTimeout(() => {

                gates.forEach(
                    gate =>
                        gate.classList.remove(
                            "active"
                        )
                );

            }, 500);

            return;

        }


        gates[index]
            .classList.add("active");


        index++;


        setTimeout(
            animate,
            600
        );

    }


    animate();

}


/* =========================================================
   QUIZ
   ========================================================= */

const quizQuestions = [

    {
        question:
            "Which field is the broadest?",
        options: [
            "Deep Learning",
            "Machine Learning",
            "Artificial Intelligence",
            "CNN"
        ],
        answer: 2
    },

    {
        question:
            "Which algorithm is commonly used for clustering?",
        options: [
            "K-Means",
            "Linear Regression",
            "Logistic Regression",
            "Perceptron"
        ],
        answer: 0
    },

    {
        question:
            "Which function is commonly used in a basic binary classifier?",
        options: [
            "Sigmoid",
            "K-Means",
            "PCA",
            "Entropy"
        ],
        answer: 0
    },

    {
        question:
            "What does backpropagation calculate?",
        options: [
            "Gradients",
            "Clusters",
            "Database tables",
            "Images"
        ],
        answer: 0
    },

    {
        question:
            "Which activation is commonly used in deep neural networks?",
        options: [
            "ReLU",
            "K-Means",
            "PCA",
            "Entropy"
        ],
        answer: 0
    },

    {
        question:
            "CNNs are particularly useful for:",
        options: [
            "Images",
            "Only databases",
            "Only sorting",
            "Only networking"
        ],
        answer: 0
    },

    {
        question:
            "What does an RNN maintain?",
        options: [
            "Hidden state",
            "Centroid",
            "Decision tree",
            "Kernel only"
        ],
        answer: 0
    },

    {
        question:
            "Which model contains forget, input and output gates?",
        options: [
            "LSTM",
            "KNN",
            "PCA",
            "SVM"
        ],
        answer: 0
    },

    {
        question:
            "Transformers are based heavily on:",
        options: [
            "Attention",
            "K-Means",
            "Decision trees",
            "Linear search"
        ],
        answer: 0
    },

    {
        question:
            "Which technique can reduce overfitting?",
        options: [
            "Dropout",
            "Removing validation",
            "Increasing noise without control",
            "Ignoring the data"
        ],
        answer: 0
    }

];


let quizIndex = 0;
let currentQuizScore = 0;
let quizAnswered = false;


function startQuiz() {

    quizIndex = 0;

    currentQuizScore = 0;

    quizAnswered = false;

    document.getElementById(
        "quizScore"
    ).textContent = "Score: 0";

    showQuizQuestion();

}


function showQuizQuestion() {

    const question =
        quizQuestions[quizIndex];


    document.getElementById(
        "questionCount"
    ).textContent =
        `Question ${quizIndex + 1} / ${quizQuestions.length}`;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    document.getElementById(
        "quizProgress"
    ).style.width =
        `${((quizIndex + 1) / quizQuestions.length) * 100}%`;


    const options =
        document.getElementById(
            "answerOptions"
        );

    options.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-option";

            button.textContent =
                `${String.fromCharCode(65 + index)}. ${option}`;


            button.addEventListener(
                "click",
                () =>
                    selectQuizAnswer(
                        index,
                        button
                    )
            );


            options.appendChild(button);

        }
    );


    document.getElementById(
        "nextButton"
    ).disabled = true;


    quizAnswered = false;

}


function selectQuizAnswer(
    selected,
    selectedButton
) {

    if (quizAnswered) return;

    quizAnswered = true;


    const question =
        quizQuestions[quizIndex];


    const buttons =
        document.querySelectorAll(
            ".answer-option"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            if (index === question.answer) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (selected === question.answer) {

        selectedButton.classList.add(
            "correct"
        );

        currentQuizScore++;

    } else {

        selectedButton.classList.add(
            "wrong"
        );

    }


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${currentQuizScore}`;


    document.getElementById(
        "nextButton"
    ).disabled = false;

}


function nextQuestion() {

    if (!quizAnswered) return;


    if (
        quizIndex <
        quizQuestions.length - 1
    ) {

        quizIndex++;

        showQuizQuestion();

        return;

    }


    const percentage =
        Math.round(
            (
                currentQuizScore /
                quizQuestions.length
            ) * 100
        );


    state.quizScore = percentage;

    state.quizAttempts++;

    saveState();


    document.getElementById(
        "questionText"
    ).innerHTML =
        `🎉 Quiz Complete!<br><br>
         You scored ${currentQuizScore}/${quizQuestions.length}
         (${percentage}%).`;


    document.getElementById(
        "answerOptions"
    ).innerHTML = `

        <div class="quick-check">

            <h3>
                ${
                    percentage >= 80
                        ? "Excellent! 🌟"
                        : percentage >= 50
                            ? "Good job! 👍"
                            : "Keep learning! 📚"
                }
            </h3>

            <p>
                Review the topics you found difficult
                and try the quiz again.
            </p>

        </div>

    `;


    document.getElementById(
        "nextButton"
    ).textContent =
        "Restart Quiz";

    document.getElementById(
        "nextButton"
    ).disabled = false;


    document.getElementById(
        "nextButton"
    ).onclick =
        startQuiz;

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const totalTopics =
        lessons.length;

    const completed =
        state.completed.length;


    const quizScore =
        state.quizScore || 0;


    const topicProgress =
        totalTopics === 0
            ? 0
            : Math.round(
                (completed / totalTopics) * 100
            );


    const overall =
        Math.round(
            topicProgress * 0.6 +
            quizScore * 0.4
        );


    document.getElementById(
        "overallScore"
    ).textContent =
        `${overall}%`;


    document.getElementById(
        "topicsMastered"
    ).textContent =
        completed;


    document.getElementById(
        "revisionQueue"
    ).textContent =
        Math.max(
            totalTopics - completed,
            0
        );


    updateAreaScores();

    updateCompletedLessons();

}


function updateAreaScores() {

    const container =
        document.getElementById(
            "areaScores"
        );

    if (!container) return;


    const areas = {};


    lessons.forEach(lesson => {

        if (!areas[lesson.area]) {

            areas[lesson.area] = {
                total: 0,
                done: 0
            };

        }


        areas[lesson.area].total++;


        if (
            state.completed.includes(
                lesson.id
            )
        ) {

            areas[lesson.area].done++;

        }

    });


    container.innerHTML = "";


    Object.entries(areas).forEach(
        ([area, data]) => {

            const percentage =
                Math.round(
                    (
                        data.done /
                        data.total
                    ) * 100
                );


            const card =
                document.createElement("div");

            card.className =
                "area-score";


            card.innerHTML = `

                <div class="area-score-top">

                    <span>
                        ${area}
                    </span>

                    <span>
                        ${percentage}%
                    </span>

                </div>

                <div class="area-bar">

                    <span
                        style="width:${percentage}%"
                    ></span>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


function updateCompletedLessons() {

    const container =
        document.getElementById(
            "completedLessons"
        );

    if (!container) return;


    const completedLessons =
        lessons.filter(
            lesson =>
                state.completed.includes(
                    lesson.id
                )
        );


    if (completedLessons.length === 0) {

        container.innerHTML = `

            <div class="completed-item">

                No lessons completed yet.
                Start learning!

            </div>

        `;

        return;

    }


    container.innerHTML =
        completedLessons
            .map(
                lesson => `

                    <div class="completed-item">

                        ✓
                        ${lesson.icon}
                        ${lesson.title}

                    </div>

                `
            )
            .join("");

}


function resetProgress() {

    const confirmReset =
        confirm(
            "Reset all learning progress and quiz scores?"
        );


    if (!confirmReset) return;


    state = {

        completed: [],

        quizScore: 0,

        quizAttempts: 0,

        topicScores: {}

    };


    saveState();

    renderLessons();

    updateDashboard();

    alert(
        "Progress has been reset."
    );

}


/* =========================================================
   NEURAL NETWORK BACKGROUND
   ========================================================= */

const neuralCanvas =
    document.getElementById(
        "neuralCanvas"
    );

const neuralCtx =
    neuralCanvas
        ? neuralCanvas.getContext("2d")
        : null;


let neuralNodes = [];


function resizeNeuralCanvas() {

    if (!neuralCanvas) return;

    neuralCanvas.width =
        window.innerWidth;

    neuralCanvas.height =
        window.innerHeight;


    createNeuralNodes();

}


function createNeuralNodes() {

    neuralNodes = [];


    const count =
        Math.min(
            70,
            Math.floor(
                window.innerWidth / 18
            )
        );


    for (let i = 0; i < count; i++) {

        neuralNodes.push({

            x:
                Math.random() *
                neuralCanvas.width,

            y:
                Math.random() *
                neuralCanvas.height,

            vx:
                (Math.random() - 0.5) *
                0.35,

            vy:
                (Math.random() - 0.5) *
                0.35

        });

    }

}


function animateNeuralNetwork() {

    if (!neuralCanvas || !neuralCtx) return;


    neuralCtx.clearRect(
        0,
        0,
        neuralCanvas.width,
        neuralCanvas.height
    );


    neuralNodes.forEach(node => {

        node.x += node.vx;

        node.y += node.vy;


        if (
            node.x < 0 ||
            node.x > neuralCanvas.width
        ) {

            node.vx *= -1;

        }


        if (
            node.y < 0 ||
            node.y > neuralCanvas.height
        ) {

            node.vy *= -1;

        }

    });


    for (
        let i = 0;
        i < neuralNodes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < neuralNodes.length;
            j++
        ) {

            const a =
                neuralNodes[i];

            const b =
                neuralNodes[j];


            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                neuralCtx.beginPath();

                neuralCtx.moveTo(
                    a.x,
                    a.y
                );

                neuralCtx.lineTo(
                    b.x,
                    b.y
                );

                neuralCtx.strokeStyle =
                    `rgba(0,229,255,${
                        0.12 *
                        (1 - distance / 120)
                    })`;

                neuralCtx.lineWidth = 1;

                neuralCtx.stroke();

            }

        }

    }


    neuralNodes.forEach(node => {

        neuralCtx.beginPath();

        neuralCtx.arc(
            node.x,
            node.y,
            2,
            0,
            Math.PI * 2
        );

        neuralCtx.fillStyle =
            "rgba(0,229,255,0.55)";

        neuralCtx.fill();

    });


    requestAnimationFrame(
        animateNeuralNetwork
    );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTheme();

        renderLessons();

        renderDLUnit(0);

        calculateNeuron();

        createCNNGrid();

        createRNNSequence();

        drawKMeans();

        drawGradientGraph(0.9);

        updateDashboard();

        startQuiz();

        resizeNeuralCanvas();

        animateNeuralNetwork();

    }
);


window.addEventListener(
    "resize",
    resizeNeuralCanvas
);


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);